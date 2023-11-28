import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { busIdState } from '../../recoil';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FaBowlFood } from "react-icons/fa6";
import { MdEventSeat } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";

const RezContainer = styled.div`
  background-color: #F2F2F2;
  height:100%
`;

const ResContainer = styled.div`
  background : #F2F2F2;
`;

const OuterContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 5px #FFB416;
  margin: 20px;
  padding: 30px;
  height : 500px;
  margin-top: 50px;
  width: 100%;
`;


const ResNameContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left:50px;
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
  width:70%;
`;

const Button = styled.button`
  background-color: #F0F0F0;
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
  const [rs, SetRs] = useState([]);
  const restaurantInfo = () => {
    axios({
      url: `http://localhost:8080/restaurant/resNo/${resNo}`,
      method: "get"
    })
      .then(response => {
        SetRs(response.data);
      })
  }

  useEffect(() => {
    restaurantInfo();
  }, [])
  console.log(rs);

  const handleMenuClick = (path) => {
    navigate(`/business/${busId}/${resNo}/${path}`);
  };



  return (
    <div className='container'>

      <div className='row mt-4'>
        <h1><FaShop style={{ color: '#FFB416' }} /> {rs.resName}</h1>
      </div>

      <div className='row border p-4'>

        <div className='col-5'>
          <RezContainer>
            <div className='rezContainer'>
              {/* 여기에 예약내역 들어감 */}
            </div>
          </RezContainer>

        </div>



        <div className='col-7'>
          <div class="d-flex justify-content-evenly text-center">
            <div className='row'>
              <div className='col'>
                <Button onClick={() => navigate(`/business/${busId}/${resNo}/menu`)}><FaBowlFood style={{ color: '#FFB416', fontSize: '4em' }} /></Button>
                메뉴관리
              </div>

              <div className='col'>
                <div>
                  <Button onClick={() => navigate(`/business/${busId}/${resNo}/seats`)}><MdEventSeat style={{ color: '#FFB416', fontSize: '4em' }} /></Button>
                </div>
                <div>
                  좌석관리
                </div>
              </div>

              <div className='col'>
                <div>
                  <Button onClick={() => navigate(`/business/${busId}/${resNo}/clock`)}><IoTime style={{ color: '#FFB416', fontSize: '4em' }} /></Button>
                </div>
                <div>
                  시간관리
                </div>
              </div>
            </div>
          </div>


          <div class="d-flex justify-content-evenly text-center">
            <div className='row mt-4 mx-auto'>
              <div className='col'>
                <div>
                  <Button onClick={() => navigate(`/business/${busId}/${resNo}/notice`)}><FaClipboardList style={{ color: '#FFB416', fontSize: '4em' }} /></Button>
                </div>
                <div>
                  공지사항
                </div>
              </div>

              <div className='col'>
                <div>
                  <Button onClick={() => navigate(`/business/${busId}/${resNo}/image`)}><MdAddPhotoAlternate style={{ color: '#FFB416', fontSize: '4em' }} /></Button>
                </div>
                <div>
                  사진관리
                </div>
              </div>


              <div className='col'>
                <div>
                  <Button onClick={() => navigate(`/business/${busId}/${resNo}/hashtag`)}><FaHashtag style={{ color: '#FFB416', fontSize: '4em' }} /></Button>
                </div>
                <div>
                  해시태그
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>





  );
};



export default ResHome;
