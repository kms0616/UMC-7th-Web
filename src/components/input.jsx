import React from 'react';
import styled from 'styled-components';

const Input = ({ value, onChange, defaultValue, placeholder }) => {
  return (
    <StyledInput
      type="text"
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

const StyledInput = styled.input`
  width: 100%; // Button의 fullWidth와 동일한 너비 설정
  padding: 10px;
  margin: 5px 0; // 간격 좁힘
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-sizing: border-box; // 패딩 포함하여 width 계산
`;


export default Input;
