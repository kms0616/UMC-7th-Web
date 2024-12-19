import React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface IFormInputs {
    email: string;
    password: string;
    passwordCheck: string;
}

const schema = yup.object().shape({
    email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
    password: yup.string()
        .min(8, '비밀번호는 8자 이상이어야 합니다.')
        .max(16, '비밀번호는 16자 이하여야 합니다.')
        .required('비밀번호를 입력해주세요.'),
    passwordCheck: yup.string()
    .oneOf([yup.ref('password'), ''], '비밀번호가 일치하지 않습니다.')  // 빈 문자열로 수정
    .required('비밀번호 확인은 필수 입력입니다.'),    

});

const SignupPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const signupMutation = useMutation({
        mutationFn: (data: IFormInputs) => axios.post('http://localhost:3000/auth/register', data),
        onSuccess: () => {
            navigate('/login');
        },
        onError: (error) => {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다.');
        },
    });

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        signupMutation.mutate(data);
    };

    return (
        <Container>
            <Title>회원가입</Title>
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
                    placeholder="비밀번호 (8자 이상 16자 미만)"
                    isError={!!errors.password}
                />
                {errors.password && <Error>{errors.password.message}</Error>}

                <Label>비밀번호 확인</Label>
                <Input
                    type="password"
                    {...register('passwordCheck')}
                    placeholder="비밀번호를 다시 입력해주세요!"
                    isError={!!errors.passwordCheck}
                />
                {errors.passwordCheck && <Error>{errors.passwordCheck.message}</Error>}

                <SignupButton type="submit" disabled={!isValid}>회원가입</SignupButton>
            </Form>
        </Container>
    );
};

export default SignupPage;

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

const SignupButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #ff0558;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
