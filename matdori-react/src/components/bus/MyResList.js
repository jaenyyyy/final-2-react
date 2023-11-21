// MyResList 컴포넌트
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { busIdState } from '../../recoil';


const MyResList = () => {
  const busId = useRecoilValue(busIdState);
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/business/myres/${busId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRestaurants(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [busId]);

  const handleResClick = (selectedResNo) => {
    if (selectedResNo) {
      navigate(`/business/${busId}/${selectedResNo}`); // 이동할 경로를 ResHome 컴포넌트의 경로로 설정합니다.
    } else {
      console.error("Restaurant number not set");
    }
  };

  const handleAddNewRes = () => {
    navigate('/bus-resAdd'); // 신규 매장 추가 버튼의 이동 경로
  };

  return (
    <div className="container mt-5">
      <h1>{busId}님 매장목록</h1>
      <button onClick={handleAddNewRes} className="btn btn-warning my-3">
        +신규매장 추가
        </button>
      <div className="row">
        {restaurants.map((restaurant) => (
          <div key={restaurant.resNo} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{restaurant.resName}</h5>
                <p className="card-text">{restaurant.resAddr1}</p>
                <p className="card-text">{restaurant.resNo}</p>
                <button onClick={() => handleResClick(restaurant.resNo)} className="btn btn-primary">
                  상세보기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyResList;
