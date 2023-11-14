import { useRecoilValue } from "recoil";
import { busIdState } from "../../recoil";
import { useEffect, useState } from "react";



const BusProfile = () => {
  const [busInfo, setBusInfo] = useState({});

  const busId = useRecoilValue(busIdState);

  useEffect(() => {
    // Replace 'YOUR_BUS_ID' with the actual business ID
    fetch(`http://localhost:8080/business/mypage/busId/${busId}`)
      .then((response) => response.json())
      .then((data) => setBusInfo(data))
      .catch((error) => console.error(error)); 
  }, []);

  return (
    <>
      <h1>{busInfo.busName}님 반갑습니다</h1>
      <p>아이디: {busInfo.busId}</p>
      <p>전화번호: {busInfo.busTel}</p>
      <p>이메일: {busInfo.busEmail}</p>
      <p>우편번호: {busInfo.busPost}</p>
      <p>기본 주소: {busInfo.busAddr1}</p>
      <p>상세주소 : {busInfo.busAddr2}</p>
    </>
  );
};

export default BusProfile;