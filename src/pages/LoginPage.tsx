import React, { useContext } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

// 로그인 폼 데이터 타입 정의
interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  password: yup.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.')
    .required('비밀번호를 입력해주세요.'),
});

const LoginPage: React.FC = () => {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => axios.post('http://localhost:3000/auth/login', data),
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      const userData = { email: response.data.email };
      handleLogin(userData);
      navigate('/');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>이메일</Label>
        <Input
          type="email"
          {...register('email')}
          placeholder="이메일 (example@gmail.com)"
          isError={!!errors.email}
        />
        {errors.email && <Error>{errors.email.message}</Error>}

        <Label>비밀번호</Label>
        <Input
          type="password"
          {...register('password')}
          placeholder="비밀번호"
          isError={!!errors.password}
        />
        {errors.password && <Error>{errors.password.message}</Error>}

        <LoginButton type="submit" disabled={!isValid}>로그인</LoginButton>
      </Form>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
`;

const Input = styled.input<{ isError: boolean }>`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid ${props => props.isError ? '#ff0558' : '#ccc'};
  border-radius: 4px;
  outline: none;

  &:focus {
    border: 1px solid blue;
  }
`;

const Error = styled.div`
  color: #ff0558;
  font-size: 12px;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #ff0558;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc; // 비활성화 시 색상
    cursor: not-allowed;
  }
`;
