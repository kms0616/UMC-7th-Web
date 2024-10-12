import styled from "styled-components";
import { lighten } from 'polished';

const Button = styled.button`
    background-color: ${(props) => props.color || 'red'};
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    margin: 5px;
    width: 100px;
    height: 40px;

    &:hover {
        background-color: ${(props) => props.color ? lighten(0.2, props.color) : '#ffcccc'};
    }
`;

export default Button;