// FindId.js

import React, { useState } from "react";
import axios from 'axios';

const FindId = () => {
  const [busRegNo, setBusRegNo] = useState("");
  const [busPw, setBusPw] = useState("");
  const [foundId, setFoundId] = useState(null); // 아이디를 저장할 상태

  const handleFindId = (e) => {
    e.preventDefault();
  
    // 입력된 정보를 기반으로 아이디를 찾기 위해 API 호출
    axios.post(`http://localhost:8080/business/findId/busregno/${busRegNo}/buspw/${busPw}`)
      .then((response) => {
        // 아이디를 찾은 경우 상태에 설정
        setFoundId(response.data); // 응답에 받은 아이디 설정
      })
      .catch((error) => {
        console.error('아이디를 찾는데 실패했습니다:', error);
        // 잘못된 정보 또는 서버 문제 등의 오류를 처리합니다.
      });
  };

  return (
    <div className="container mt-5">
      <h1>아이디 찾기 페이지</h1>
      <form onSubmit={handleFindId}>
        <div className="mb-3">
          <label htmlFor="busRegNo" className="form-label">사업자 등록번호</label>
          <input
            type="text"
            className="form-control"
            id="busRegNo"
            value={busRegNo}
            onChange={(e) => setBusRegNo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busPw" className="form-label">비밀번호</label>
          <input
            type="password"
            className="form-control"
            id="busPw"
            value={busPw}
            onChange={(e) => setBusPw(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">아이디 찾기</button>
      </form>

      {foundId && (
        <div className="mt-3">
          <p>찾은 아이디: {foundId}</p>
        </div>
      )}
    </div>
  );
};

export default FindId;
