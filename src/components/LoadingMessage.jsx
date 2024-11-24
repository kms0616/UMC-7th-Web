import React from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa'; // 로딩 아이콘

function LoadingMessage() {
  return (
    <LoadingWrapper>
      <div className="loading">
        <FaSpinner className="spinner" />
        <p>로딩 중...</p>
      </div>
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .loading {
    display: flex;
    flex-direction: column;  /* 아이콘과 글씨가 세로로 배치되도록 수정 */
    align-items: center;
    font-size: 24px;
  }
  
  .spinner {
    font-size: 30px;
    animation: spin 1s linear infinite;
    margin-bottom: 10px;  /* 에러 메시지와 같은 거리로 간격을 추가 */
  }

  p {
    font-size: 18px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default LoadingMessage;
