import React from 'react';
import styled from 'styled-components';
import { Header, Post } from '../components';

const Main = () => {
    return (
        <Layout>
            <Header/>
            <Post/>
        </Layout>
    );
};

const Layout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export default Main;