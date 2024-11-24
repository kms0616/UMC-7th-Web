// Button.jsx
import React from 'react';
import styled from 'styled-components';

const Button = ({ label, fullWidth, ...props }) => {
  return <StyledButton fullWidth={fullWidth} {...props}>{label}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #9cc5e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};  // fullWidth에 따라 너비 조정
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default Button;
