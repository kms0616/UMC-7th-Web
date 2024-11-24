import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';  // X 아이콘

function ErrorMessage() {
  return (
    <ErrorWrapper>
      <div className="error-message">
        <div className="error-icon">
          <FaTimes />
        </div>
        <p>에러가 발생했습니다.</p>
      </div>
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    font-size: 20px;
  }

  .error-icon {
    font-size: 40px;
    color: red;
    animation: draw-x 1s forwards; /* X 모양이 점진적으로 그려지도록 애니메이션 */
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-top: 10px;
  }

  /* X 아이콘이 점진적으로 그려지는 애니메이션 */
  @keyframes draw-x {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

export default ErrorMessage;
