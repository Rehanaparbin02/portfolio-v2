import React from 'react';

const Logo = ({ className = "" }) => {
    return (
        <svg
            width="300"
            height="200"
            viewBox="0 0 300 200"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="100%" height="100%" fill="white" />
            <text
                x="50%"
                y="50%"
                text-anchor="middle"
                dominant-baseline="middle"
                font-family="Inter, Helvetica, Arial, sans-serif"
                font-size="140"
                font-weight="700"
                fill="#000000"
                letter-spacing="2"
            >
                RP
            </text>
        </svg>
    );
};

export default Logo;
