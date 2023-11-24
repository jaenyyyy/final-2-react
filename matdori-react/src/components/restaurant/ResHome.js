import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { busIdState } from '../../recoil';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const OuterContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;
  height : 500px;
`;

const ResNameContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  width: 50%;
  padding-right: 10px; // 오른쪽 여백을 줍니다.
`;

const RightContainer = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-left: 10px; // 왼쪽 여백을 줍니다.
`;

const ReservationsContainer = styled.div`
  background: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  height: 100%; // 왼쪽 컨테이너와 같은 높이를 유지합니다.
`;

const Button = styled.button`
  background-color: #f0ad4e;
  border: none;
  color: white;
  margin: 10px;
  border-radius: 50%;
  cursor: pointer;
  width: 100px; 
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;

  &:hover {
    opacity: 0.8;
  }
`;
const ResHome = () => {
  const { resNo } = useParams();
  const busId = useRecoilValue(busIdState);
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    // 데이터를 가져오는 axios 요청
    axios(`http://localhost:8080/business/${busId}/${resNo}`, {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    })
    .then((response) => response.json()
    .then(response=>{
      setRestaurant(response.data);
    })
    )
    // .then((data) => {
    //   setRestaurant(response.data); // 가져온 데이터를 상태에 저장
    // })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setRestaurant({ resName: restaurant.resName }); // 오류 발생 시 오류 메시지 저장
    });
  }, [busId, resNo]);
  console.log(restaurant);

  const handleMenuClick = (path) => {
    navigate(`/business/${busId}/${resNo}/${path}`);
  };

 
  return (
    <OuterContainer>
    <ResNameContainer>
      <h1>{restaurant.resName}</h1>
    </ResNameContainer>
      <ContentContainer>
        <LeftContainer>
          <ReservationsContainer>
            {/* 예약 정보 표시 로직 */}
            예약 건수 및 예약 리스트 (임의의 데이터 또는 로딩 표시)
          </ReservationsContainer>
        </LeftContainer>
        <RightContainer>
          <Button onClick={() => navigate(`/business/${busId}/${resNo}/menu`)}>메뉴 관리</Button>
          <Button onClick={() => navigate(`/business/${busId}/${resNo}/seats`)}>좌석 관리</Button>
          <Button onClick={() => navigate(`/business/${busId}/${resNo}/hours`)}>시간 관리</Button>
          <Button onClick={() => navigate(`/business/${busId}/${resNo}/notices`)}>공지사항 관리</Button>
          <Button onClick={() => navigate(`/business/${busId}/${resNo}/statistics`)}>매장 통계</Button>
          <Button onClick={() => navigate(`/business/${busId}/${resNo}/hashtag`)}>해시태그</Button>
        </RightContainer>
      </ContentContainer>
    </OuterContainer>
  );
};

export default ResHome;
