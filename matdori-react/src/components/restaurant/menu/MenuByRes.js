import { useRecoilValue } from "recoil";
import { busIdState } from "../../recoil";
import { useEffect, useState } from "react";



const BusProfile = () => {
  const [busInfo, setBusInfo] = useState({});

  const busId = useRecoilValue(busIdState);

 

  return (
    <>
      <h1>{busInfo.busName}님 반갑습니다</h1>
   
    </>
  );
};

export default MenuByRes;