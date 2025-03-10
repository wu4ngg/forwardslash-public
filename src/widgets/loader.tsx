'use client'
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
`;

type LoaderProps = {
    width?: number,
    height?: number
}
const Loader: React.FC<LoaderProps> = (props) => {
    const Cube = styled.div`
        width: 16px;
        height: 16px;
        background-color: white;
        animation: ${spin} 1s infinite linear;
    `;
    return <Cube />;
};

export default Loader;