import React from 'react';
import {useNavigate} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { PiFilmSlate } from 'react-icons/pi';
import styled from 'styled-components';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <SidebarContainer>
            <SidebarButton onClick={() => navigate('/search')}>
                <FaSearch />찾기
            </SidebarButton>
            <SidebarButton onClick={() => navigate('/movies')}>
                <PiFilmSlate />영화
            </SidebarButton>
        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer = styled.div`
    width: 200px;
    padding: 5px;
    background-color: #1c1c1c;
`;

const SidebarButton = styled.button`
    display: flex;
    align-items: center;
    padding : 10px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
    color: white;
    width: 100%;

    &:hover {
        background-color: #444;
    }

    svg {
        margin-right: 15px;
    }
`;