import React from 'react';
import styled from 'styled-components';

const Choice = () => {
    return (
        <ButtonArea>
            <button>A posts</button>
            <button>B posts</button>
        </ButtonArea>
    );
};

const ButtonArea = styled.div`
    width: 56rem;
    border-bottom: 1px solid red;
`

export default Choice;