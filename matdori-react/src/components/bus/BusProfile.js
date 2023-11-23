import { useRecoilValue } from "recoil";
import { busIdState } from "../../recoil";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BusProfile = () => {
  const [busInfo, setBusInfo] = useState({});

  const busId = useRecoilValue(busIdState);

  useEffect(() => {
    fetch(`http://localhost:8080/business/mypage/busId/${busId}`)
      .then((response) => response.json())
      .then((data) => setBusInfo(data))
      .catch((error) => console.error(error));
  }, [busId]);

  return (
    <div className="container text-center mt-5">
      <h1>{busInfo.busName}님 반갑습니다</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 text-start">
          <p className="lead">아이디: {busInfo.busId}</p>
          <p className="lead">전화번호: {busInfo.busTel}</p>
          <p className="lead">이메일: {busInfo.busEmail}</p>
          <p className="lead">우편번호: {busInfo.busPost}</p>
          <p className="lead">기본 주소: {busInfo.busAddr1}</p>
          <p className="lead">상세주소 : {busInfo.busAddr2}</p>

          {/* 개인정보 변경으로 이동하는 링크 */}
          <Link to="/bus-update">개인정보 변경</Link>

        </div>
      </div>
    </div>
  );
};

export default BusProfile;
