import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { busIdState } from "../../recoil";
import { useParams } from "react-router-dom";

const ResHome = () => {
  const { resNo } = useParams();
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
      setRestaurants(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
  }, [busId]);

  const handleMenuClick = (selectedResNo) => {
    if (selectedResNo) {
      navigate(`/business/${busId}/${selectedResNo}/menu`);
    } else {
      console.error("Restaurant number not set");
    }
  };

  return (
    <>
      {restaurants.map((restaurant) => (
        <div key={restaurant.resNo}>
          <h1>{restaurant.resName}</h1>
          <button onClick={() => handleMenuClick(restaurant.resNo)}>메뉴관리</button>
    <button onClick={() => handleMenuClick(resNo)}>좌석관리</button>
    <button onClick={() => handleMenuClick(resNo)}>시간관리</button>
    <button onClick={() => handleMenuClick(resNo)}>공지사항관리</button>
    <button onClick={() => handleMenuClick(resNo)}>매장통계</button>
    </div>
      ))}
    </>
  );
};

export default ResHome;