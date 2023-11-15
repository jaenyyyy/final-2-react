import React, { useState } from "react";
import axios from 'axios';

const FindId = () => {
  const [busRegNo, setBusRegNo] = useState("");
  const [busPw, setBusPw] = useState("");
  const [foundId, setFoundId] = useState(null);
  const [noMatch, setNoMatch] = useState(false);

  const handleFindId = (e) => {
    e.preventDefault();
  
    axios.post(`http://localhost:8080/business/findId/busregno/${busRegNo}/buspw/${busPw}`)
      .then((response) => {
        setFoundId(response.data);
        setNoMatch(false);
      })
      .catch((error) => {
        console.error('아이디를 찾는데 실패했습니다:', error);
        setFoundId(null);
        setNoMatch(true);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">아이디 찾기</h1>
      <form onSubmit={handleFindId} className="row g-3">
        <div className="col-6">
          <label htmlFor="busRegNo" className="form-label">회원가입시 입력한 사업자 등록번호</label>
          <input
            type="text"
            className="form-control"
            id="busRegNo"
            value={busRegNo}
            onChange={(e) => setBusRegNo(e.target.value)}
            required
            placeholder="10자리 숫자입니다"
          />
        </div>

        <div className="col-6">
          <label htmlFor="busPw" className="form-label">비밀번호</label>
          <input
            type="password"
            className="form-control"
            id="busPw"
            value={busPw}
            onChange={(e) => setBusPw(e.target.value)}
            required
            placeholder="대,소문자,숫자,특수 문자를 포함하는 8~15자 사이의 문자입니다"
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">아이디 찾기</button>
        </div>
      </form>

      {foundId && (
        <div className="mt-4 border p-3">
          <p className="mb-0"><strong>찾은 아이디:</strong> {foundId}</p>
        </div>
      )}

      {noMatch && !foundId && (
        <div className="mt-4 border p-3">
          <p className="mb-0">일치하는 정보가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default FindId;
