import styled from "styled-components";

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;

    input {
        flex: 1;
        padding: 15px;
        border: none;
        border-right: none;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    button {
        width: 80px;
        background-color: #ff0558;
        color: white;
        cursor: pointer;
        border: none;
        border-left: none;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    
`
const MovieGridContainer = styled.div`
    margin-top: 30px;
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`
export {SearchContainer, MovieGridContainer};