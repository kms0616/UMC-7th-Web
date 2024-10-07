import React from 'react';
import './Input.css';

const Input = ({ value, onChange, defaultValue}) => {
    return (
        <input
            className = "todo-input"
            type = "text"
            value = {value}
            defaultValue = {defaultValue}
            onChange = {onChange}
        />
    );
};

export default Input;