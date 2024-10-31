import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

const RootLayout = () => {
    return (
        <LayoutContainer>
            <Navbar />
            <MainContent>
                <Sidebar />
                <PageContent>
                    <Outlet />
                </PageContent>
            </MainContent>
        </LayoutContainer>
    );
};

export default RootLayout;

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;

const MainContent = styled.div`
    display: flex;
    flex-grow: 1;
`;

const PageContent = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #000;
`;