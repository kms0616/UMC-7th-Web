import React, {useState} from 'react';
import styled from 'styled-components';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isTouched, setIsTouched] = useState({ email: false, password: false });
    
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError("올바른 이메일 형식이 아닙니다. 다시 확인해주세요!")
        }
        else {
            setEmailError('');
        }
    };
    
    const validatePassword = (value) => {
        if (value.length < 8 || value.length > 16) {
            setPasswordError("비밀번호는 8 ~ 16자리 사이로 입력해주세요!");
        }
        else {
            setPasswordError('');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const handleBlur = (field) => {
        setIsTouched({ ...isTouched, [field]: true });
    };
    const isFormValid = email && password && !emailError && !passwordError;
    return (
        <Container>
            <Title>로그인</Title>
            <Form>
                <Label>이메일</Label>
                <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="이메일을 입력해주세요!"
                    onBlur={() => handleBlur('email')}
                    isError={isTouched.email && emailError}
                />
                {isTouched.email && emailError && <Error>{emailError}</Error>}

                <Label>비밀번호</Label>
                <Input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호를 입력해주세요!"
                    onBlur={() => handleBlur('password')}
                    isError={isTouched.password && passwordError}
                />
                {isTouched.password && passwordError && <Error>{passwordError}</Error>}

                <LoginButton disabled={!isFormValid}>로그인</LoginButton>
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

const Form = styled.div`
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
    background-color: ${(props) => (props.disabled ? '#ccc' : '#ff0558')};
    color: white;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;