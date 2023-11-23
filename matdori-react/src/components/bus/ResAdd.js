import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { busIdState } from '../../recoil';

const ResAdd = () => {
  const navigate = useNavigate();
  const busId = useRecoilValue(busIdState);

  const [restaurantData, setRestaurantData] = useState({
    busId:busId,
    resName: "",
    resRegionNo: "",
    resRegNo: "",
    resTel: "",
    resPost: "",
    resAddr1: "",
    resAddr2: "",
    resOpenTime: ""
  });

  const handleChange = (e) => {
    console.log("Sending busId:", restaurantData.busId);
    const { name, value } = e.target;
    setRestaurantData({
      ...restaurantData,
      [name]: value
    });
  };

  const handleJoinClick = () => {
    // payload를 여기서 정의해야 합니다.
    const payload = {
      restaurantDto: {
        busId: busId, 
        resName: restaurantData.resName,
        resRegionNo:restaurantData.resRegionNo,
        resRegNo: restaurantData.resRegNo,
        resTel: restaurantData.resTel,
        resOpenTime: restaurantData.resOpenTime,
        resPost: restaurantData.resPost,
        resAddr1: restaurantData.resAddr1,
        resAddr2: restaurantData.resAddr2,
        // 클라이언트 측에서 설정하지 않고 서버 측에서 자동 생성되는 필드들은 포함하지 않음
      },
      restaurantJudgeDto: {} // 클라이언트 측에서 설정할 필요가 없으므로 빈 객체로 전송
    };
  
    axios.post('http://localhost:8080/restaurant/', payload)
      .then((response) => {
        console.log('매장 등록 성공', response.data);
        navigate('/join/success');
      })
      .catch((error) => {
        console.error('정보 등록 실패:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1>매장 등록</h1>
  
      {/* 매장명 입력 필드 */}
      <div className="mb-3">
        <label htmlFor="resName" className="form-label">매장명</label>
        <input
          type="text"
          className="form-control"
          id="resName"
          name="resName"
          value={restaurantData.resName}
          onChange={handleChange}
        />
      </div>

{/* 지역번호 입력 필드 */}
<div className="mb-3">
        <label htmlFor="resRegionNo" className="form-label">지역번호</label>
        <input
          type="text"
          className="form-control"
          id="resRegionNo"
          name="resRegionNo"
          value={restaurantData.resRegionNo}
          onChange={handleChange}
        />
      </div>

      {/* 사업자 등록번호 입력 필드 */}
      <div className="mb-3">
        <label htmlFor="resRegNo" className="form-label">사업자 등록번호</label>
        <input
          type="text"
          className="form-control"
          id="resRegNo"
          name="resRegNo"
          value={restaurantData.resRegNo}
          onChange={handleChange}
        />
      </div>

      {/* 전화번호 입력 필드 */}
      <div className="mb-3">
        <label htmlFor="resTel" className="form-label">전화번호</label>
        <input
          type="text"
          className="form-control"
          id="resTel"
          name="resTel"
          value={restaurantData.resTel}
          onChange={handleChange}
        />
      </div>

      {/* 우편번호 입력 필드 */}
      <div className="mb-3">
        <label htmlFor="resPost" className="form-label">우편번호</label>
        <input
          type="text"
          className="form-control"
          id="resPost"
          name="resPost"
          value={restaurantData.resPost}
          onChange={handleChange}
        />
      </div>

      {/* 주소 입력 필드 */}
      <div className="mb-3">
        <label htmlFor="resAddr1" className="form-label">기본주소</label>
        <input
          type="text"
          className="form-control"
          id="resAddr1"
          name="resAddr1"
          value={restaurantData.resAddr1}
          onChange={handleChange}
        />
      </div>

      {/* 상세주소 입력 필드 */}
      <div className="mb-3">
        <label htmlFor="resAddr2" className="form-label">상세주소</label>
        <input
          type="text"
          className="form-control"
          id="resAddr2"
          name="resAddr2"
          value={restaurantData.resAddr2}
          onChange={handleChange}
        />
      </div>

      {/* 오픈 시간 입력 필드 */}
      <div className="mb-3">
        <label htmlFor="resOpenTime" className="form-label">오픈 시간</label>
        <input
          type="text"
          className="form-control"
          id="resOpenTime"
          name="resOpenTime"
          value={restaurantData.resOpenTime}
          onChange={handleChange}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleJoinClick}
      >
        등록하기
      </button>
    </div>
  );
};

export default ResAdd;
