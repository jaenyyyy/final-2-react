import { useRecoilValue } from "recoil";
import { busIdState } from "../../recoil";
import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

const BusProfile = () => {
  const [busInfo, setBusInfo] = useState({});

  const busId = useRecoilValue(busIdState);
  const linkStyle = {
    width: '100%',
    textDecoration: 'none',
    color: '#ff0000',
  };


  useEffect(() => {
    fetch(`http://localhost:8080/business/mypage/busId/${busId}`)
      .then((response) => response.json())
      .then((data) => setBusInfo(data))
      .catch((error) => console.error(error));
  }, [busId]);

  return (
    <div className="container text-center mt-5">
      <div className="row mt-4 text-start mb-4">
        <h1><FaUserTie style={{ color: '#FFB416' }} />마이페이지</h1>
      </div>
      <div className="row border border-warning p-4 text-start">
        <h1 className="ms-4">{busInfo.busName}님 반갑습니다.</h1>
        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col text-start">
            <table class="table table-border table-stripe text-center mt-4">
              <tr>
                <th width="25%">아이디</th>
                <td>{busInfo.busId}</td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>{busInfo.busTel}</td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>{busInfo.busEmail}</td>
              </tr>
              <tr>
                <th>우편번호</th>
                <td>{busInfo.busPost}</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>{busInfo.busPost}{busInfo.busAddr1}{busInfo.busAddr2}</td>
              </tr>

            </table>



          </div>
          <div className="col text-center">
            {/* 개인정보 변경으로 이동하는 링크 */}
            <div className="row">
              <div className="col mt-4">
                <Link to="/bus-update" style={linkStyle}>
                  <button className="btn btn-outline-warning btn-block">개인정보 변경</button>
                </Link>
              </div>
            </div>

            {/* 사업자 회원 탈퇴로 이동하는 링크 */}
            <div className="row mt-2"> {/* 위아래 간격을 조절하기 위해 mt-2 클래스 사용 */}
              <div className="col mt-4">
                <Link to="/bus-quit" style={linkStyle}>
                  <button className="btn btn-outline-warning btn-block">사업자 회원 탈퇴</button>
                </Link>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>

  );
};

export default BusProfile;
