import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { busIdState } from '../../recoil';

const ResAdd = () => {
  const navigate = useNavigate();
  const busId = useRecoilValue(busIdState);

  const [regions, setRegions] = useState([
    { no: 1, name: '영등포구' },
    { no: 2, name: '강동구' },
    { no: 3, name: '송파구' },
    { no: 4, name: '강남구' },
    { no: 5, name: '서초구' },
    { no: 6, name: '관악구' },
    { no: 7, name: '동작구' },
    { no: 8, name: '금천구' },
    { no: 9, name: '구로구' },
    { no: 10, name: '강서구' },
    { no: 11, name: '양천구' },
    { no: 12, name: '마포구' },
    { no: 13, name: '서대문구' },
    { no: 17, name: '노원구' },
    { no: 18, name: '도봉구' },
    { no: 16, name: '은평구' },
    { no: 19, name: '강북구' },
    { no: 20, name: '성북구' },
    { no: 21, name: '중랑구' },
    { no: 22, name: '동대문구' },
    { no: 23, name: '광진구' },
    { no: 24, name: '성동구' },
    { no: 25, name: '용산구' },
    { no: 26, name: '종로구' },
    { no: 27, name: '은평구' }

  ]);

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

  const handleRegionChange = (e) => {
    const selectedRegionNo = e.target.value;
    console.log("선택된 지역 번호:", selectedRegionNo); 
    setRestaurantData(prevState => {
      const updatedState = { ...prevState, resRegionNo: selectedRegionNo };
      console.log(" restaurantData:", updatedState); 
      return updatedState; // 업데이트된 상태를 반환
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

 {/* 지역번호 드롭다운 메뉴 */}
 <div className="mb-3">
        <label htmlFor="resRegionNo" className="form-label">지역번호</label>
        <select
  className="form-control"
  id="resRegionNo"
  name="resRegionNo"
  value={restaurantData.resRegionNo}
  onChange={handleRegionChange}
>
  <option value="">지역을 선택하세요</option>
  {regions.map((region) => (
    <option key={region.no} value={region.no}>
      {region.name}
    </option>
  ))}
</select>
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
