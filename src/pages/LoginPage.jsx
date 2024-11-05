import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// yup 스키마 정의
const schema = yup.object().shape({
    email: yup.string().email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!').required('이메일을 입력해주세요.'),
    password: yup.string()
        .min(8, '비밀번호는 8자 이상이어야 합니다.') //에러문구
        .max(16, '비밀번호는 16자 이하여야 합니다.')
        .required('비밀번호를 입력해주세요.'),
});

const LoginPage = () => {
    // useForm 훅 사용
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema), // yup 스키마를 리졸버로 설정
        mode: "onChange", // 입력값이 변경될 때마다 유효성 검사
    });

    const onSubmit = (data) => {
        console.log('로그인 데이터 제출', data);
    };

    return (
        <Container>
            <Title>로그인</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>이메일</Label>
                <Input
                    type="email"
                    {...register("email")}
                    placeholder="이메일을 입력해주세요!"
                    isError={!!errors.email} // 에러가 있을 때 true
                />
                {errors.email && <Error>{errors.email.message}</Error>}

                <Label>비밀번호</Label>
                <Input
                    type="password"
                    {...register("password")}
                    placeholder="비밀번호를 입력해주세요!"
                    isError={!!errors.password} // 에러가 있을 때 true
                />
                {errors.password && <Error>{errors.password.message}</Error>}

                <LoginButton type="submit" disabled={!isValid}>로그인</LoginButton>
            </Form>
        </Container>
    );
};

export default LoginPage;

// Styled Components
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

const Input = styled.input`
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
