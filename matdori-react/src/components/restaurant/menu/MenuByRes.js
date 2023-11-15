import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useRecoilValue } from "recoil";
// import { busIdState } from "../../../recoil";



const MenuByRes = (props) => {
  // const busId = useRecoilValuealue(busIdStateIdState);
  const [restaurantList, setRestaurantList] = useState([]);
  // const resNo = props.resNo; // 매장 번호는 props를 통해 전달되어야 합니다.
  const [resNo, setResNo] = useState(''); // 매장 번호는 props를 통해 전달되어야 합니다.

  useEffect(() => {
    const loadRestaurant = () => {
      const response =  axios({
        url: `${process.env.REACT_APP_REST_API_URL}/menu/list/${resNo}`,
        method: "get",
        params: {
          resNo : resNo
        }
      })
      .then((response) => {
        setRestaurantList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    };

    if (resNo) {
      loadRestaurant();
    }
  }, []); // resNo가 변경될 때마다 요청

  return (
    <div className="container mt-5">
      <h1>매장 메뉴 목록</h1>
      <table className="table">
        <thead>
          <tr>
            <th>메뉴 번호</th>
            <th>메뉴 이름</th>
            <th>메뉴 설명</th>
          </tr>
        </thead>
        <tbody>
          {restaurantList.map((menu) => (
            <tr key={menu.menuNo}>
              <td>{menu.menuNo}</td>
              <td>{menu.menuName}</td>
              <td>{menu.menuContent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuByRes;
