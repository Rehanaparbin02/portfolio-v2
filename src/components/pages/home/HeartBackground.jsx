import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

const HeartBackground = ({ isLoaded }) => {
    const containerRef = useRef(null);
    const physicsRef = useRef(null);
    const mouse = useRef(new THREE.Vector2(-100, -100));

    useEffect(() => {
        if (!isLoaded) return;

        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/gh/kripken/ammo.js@master/builds/ammo.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.Ammo().then((AmmoLib) => {
                initThree(AmmoLib);
            });
        };

        let renderer, scene, camera, animationId, bodies = [];

        async function initThree(Ammo) {
            const physics = await initPhysics(Ammo);
            physicsRef.current = physics;

            camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 0, 2.5);

            scene = new THREE.Scene();

            // High intensity lighting for the "Shiny" effect
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
            scene.add(ambientLight);

            const spotLight = new THREE.SpotLight(0xffffff, 60);
            spotLight.position.set(5, 5, 5);
            scene.add(spotLight);

            new RGBELoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/quarry_01_1k.hdr', (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.environment = texture;

                new OBJLoader().load('https://happy358.github.io/misc/model/Heart/Heart.obj', (object) => {
                    let geometry = object.children[0].geometry;
                    geometry = BufferGeometryUtils.mergeVertices(geometry);
                    geometry.computeVertexNormals();
                    geometry.center();

                    // Static Invisible Container
                    const terrainGeom = geometry.clone().scale(0.12, 0.12, 0.12);
                    const terrain = new THREE.Mesh(terrainGeom, new THREE.MeshBasicMaterial({ visible: false }));
                    terrain.name = "terrain";
                    scene.add(terrain);
                    physics.addMesh(terrain, 0);

                    // Silver & Black Materials
                    const silverMat = new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        metalness: 1,
                        roughness: 0.05, // Lower roughness for more shine
                        envMapIntensity: 2
                    });

                    const instancedMesh = new THREE.InstancedMesh(geometry.clone().scale(0.016, 0.016, 0.016), silverMat, 65);
                    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

                    const matrix = new THREE.Matrix4();
                    const color = new THREE.Color();
                    const palette = [0xDDDDDD, 0x050505]; // Silver & Black

                    for (let i = 0; i < instancedMesh.count; i++) {
                        matrix.setPosition(
                            THREE.MathUtils.randFloat(-0.6, 0.6),
                            THREE.MathUtils.randFloat(-0.3, 0.6),
                            THREE.MathUtils.randFloat(-0.2, 0.2)
                        );
                        instancedMesh.setMatrixAt(i, matrix);
                        instancedMesh.setColorAt(i, color.setHex(palette[i % 2]));
                    }

                    scene.add(instancedMesh);
                    bodies = physics.addMesh(instancedMesh, 1);
                });
            });

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            containerRef.current.appendChild(renderer.domElement);

            const raycaster = new THREE.Raycaster();

            const animate = () => {
                animationId = requestAnimationFrame(animate);

                if (bodies.length > 0) {
                    raycaster.setFromCamera(mouse.current, camera);
                    const mousePos = new THREE.Vector3();
                    raycaster.ray.at(2.2, mousePos); // Interaction plane depth

                    bodies.forEach((body) => {
                        const transform = new Ammo.btTransform();
                        body.getMotionState().getWorldTransform(transform);
                        const origin = transform.getOrigin();

                        const bodyVec = new THREE.Vector3(origin.x(), origin.y(), origin.z());
                        const dist = bodyVec.distanceTo(mousePos);

                        // Magnetic Attraction Logic
                        if (dist < 0.8) {
                            const force = new THREE.Vector3().subVectors(mousePos, bodyVec).normalize().multiplyScalar(12 * (1 - dist));
                            body.applyCentralImpulse(new Ammo.btVector3(force.x, force.y, force.z));
                        }
                    });
                }

                renderer.render(scene, camera);
            };
            animate();
        }

        async function initPhysics(Ammo) {
            const colCfg = new Ammo.btDefaultCollisionConfiguration();
            const disp = new Ammo.btCollisionDispatcher(colCfg);
            const broad = new Ammo.btDbvtBroadphase();
            const solv = new Ammo.btSequentialImpulseConstraintSolver();
            const world = new Ammo.btDiscreteDynamicsWorld(disp, broad, solv, colCfg);
            world.setGravity(new Ammo.btVector3(0, -3, 0)); // Light gravity

            const trans = new Ammo.btTransform();
            const meshList = [];
            const bodyMap = new WeakMap();

            function addMesh(mesh, mass) {
                let shape;
                if (mesh.name === "terrain") {
                    const triMesh = new Ammo.btTriangleMesh();
                    const pos = mesh.geometry.attributes.position.array;
                    for (let i = 0; i < pos.length; i += 9) {
                        triMesh.addTriangle(
                            new Ammo.btVector3(pos[i], pos[i + 1], pos[i + 2]),
                            new Ammo.btVector3(pos[i + 3], pos[i + 4], pos[i + 5]),
                            new Ammo.btVector3(pos[i + 6], pos[i + 7], pos[i + 8])
                        );
                    }
                    shape = new Ammo.btBvhTriangleMeshShape(triMesh, true, true);
                } else {
                    shape = new Ammo.btConvexHullShape();
                    const pos = mesh.geometry.attributes.position;
                    for (let i = 0; i < pos.count; i++) {
                        shape.addPoint(new Ammo.btVector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
                    }
                }

                if (mesh.isInstancedMesh) {
                    const bodiesArr = [];
                    for (let i = 0; i < mesh.count; i++) {
                        const m4 = new THREE.Matrix4();
                        mesh.getMatrixAt(i, m4);
                        const t = new Ammo.btTransform();
                        t.setFromOpenGLMatrix(m4.elements);
                        const localInertia = new Ammo.btVector3(0, 0, 0);
                        shape.calculateLocalInertia(mass, localInertia);
                        const rb = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(mass, new Ammo.btDefaultMotionState(t), shape, localInertia));
                        rb.setDamping(0.2, 0.2); // Prevents excessive jitter
                        world.addRigidBody(rb);
                        bodiesArr.push(rb);
                    }
                    meshList.push(mesh);
                    bodyMap.set(mesh, bodiesArr);
                    return bodiesArr;
                } else {
                    const t = new Ammo.btTransform();
                    t.setIdentity();
                    const rb = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(mass, new Ammo.btDefaultMotionState(t), shape, new Ammo.btVector3(0, 0, 0)));
                    world.addRigidBody(rb);
                    meshList.push(mesh);
                    bodyMap.set(mesh, rb);
                    return rb;
                }
            }

            const interval = setInterval(() => {
                world.stepSimulation(1 / 60, 10);
                meshList.forEach(m => {
                    if (m.isInstancedMesh) {
                        const bds = bodyMap.get(m);
                        for (let i = 0; i < bds.length; i++) {
                            bds[i].getMotionState().getWorldTransform(trans);
                            m.instanceMatrix.array.set(trans.getOpenGLMatrix(), i * 16);
                        }
                        m.instanceMatrix.needsUpdate = true;
                    }
                });
            }, 1000 / 60);

            return { addMesh, cleanup: () => clearInterval(interval) };
        }

        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            if (physicsRef.current) physicsRef.current.cleanup();
            if (script.parentNode) document.body.removeChild(script);
        };
    }, [isLoaded]);

    return <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
};

export default HeartBackground;