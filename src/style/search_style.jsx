import styled from 'styled-components';

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
    gap: 10px;

    input {
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        flex: 1;
    }

    button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #555;
        }
    }
`;

export const MovieListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px;
`;

export const MovieListItem = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
    background-color: #000;
    border-radius: 10px;
    cursor: pointer;

`;

export const MoviePoster = styled.div`
    flex-shrink: 0;
    width: 120px; /* 포스터의 너비 */
    height: 180px; /* 포스터의 높이 */
    border-radius: 10px;
    overflow: hidden;
`;

export const MovieDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;

    h3 {
        margin: 0;
        font-size: 18px;
        color: white;
    }

    p {
        margin: 0;
        font-size: 14px;
        color: #aaa;
    }
`;

