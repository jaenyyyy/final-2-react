import { useState } from "react";
import { busIdState } from "../../recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";


const BusQuit = () => {
  const [password, setPassword] = useState("");
  //const busId = useRecoilValue(busIdState);
  const [busId, setBusId] = useRecoilState(busIdState);
  const navigate = useNavigate();
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleWithdrawal = async () => {
    try {
      const response = await fetch(`http://localhost:8080/business/quit/${busId}?password=${password}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // 회원 탈퇴 성공
        alert("회원 탈퇴가 완료되었습니다.");
        localStorage.removeItem('loggedInBusId'); // 로그아웃: 로컬 스토리지에서 아이디 제거
        localStorage.removeItem('loggedInToken'); // 로컬 스토리지에서 토큰 제거
        setBusId(''); // Recoil 상태 비우기
        navigate('/bus-quitsuccess');
      } else if (response.status === 401) {
        // 비밀번호 오류
        alert("비밀번호가 올바르지 않습니다.");
      } else {
        // 서버 오류
        alert("회원 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원 탈퇴 요청 중 오류 발생:", error);
      alert("회원 탈퇴 요청 중 오류가 발생했습니다.");
    }
  };
  

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <h2 style={{ textAlign: "center" }}>회원 탈퇴</h2>
      <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
        경고: 회원 탈퇴 시에는 복구할 수 없습니다.
      </p>
      <div style={{ textAlign: "center" }}>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handlePasswordChange}
          style={{
            padding: "8px",
            margin: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <br />
        <button
          onClick={handleWithdrawal}
          style={{
            padding: "10px 20px",
            margin: "8px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default BusQuit;
