import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResHome = () => {
  const navigate = useNavigate(); // useNavigate 훅을 이용해 navigate 함수를 얻습니다.

  // '메뉴관리' 버튼을 클릭했을 때 호출될 함수
  const handleMenuClick = () => {
    navigate('/restaurant/menu/list'); // navigate 함수를 사용해 해당 경로로 이동합니다.
  };

  return (
    <>
      <h1>메인</h1>
      <button onClick={handleMenuClick}>메뉴관리</button>
    <button>좌석관리</button>
    <button>시간관리</button>
    <button>공지사항관리</button>
    <button>매장통계</button>
    </>
  );
};

export default ResHome;