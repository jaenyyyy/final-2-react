import React, { useState } from "react";
import axios from 'axios';

const FindPw = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [busRegNo, setBusRegNo] = useState("");
  const [passwordSent, setPasswordSent] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const handleFindPassword = (e) => {
    e.preventDefault();
  
    console.log("전송하는 데이터:", { id, email, busRegNo }); // 전송되는 데이터 확인
  
    axios.post('http://localhost:8080/business/findPw', {
  busId: id,
  busEmail: email,
  busRegNo: busRegNo
})
  .then((response) => {
    console.log("응답 받은 데이터:", response.data);
    if (response.data === "임시 비밀번호를 이메일로 전송하였습니다.") {
      setPasswordSent(true);
      setNoMatch(false);
    } else {
      setPasswordSent(false);
      setNoMatch(true);
    }
  })
  .catch((error) => {
    console.error('비밀번호 찾기에 실패했습니다:', error);
    setPasswordSent(false);
    setNoMatch(true);
  });

  };
  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">비밀번호 찾기</h1>
      <p className="text-center mb-4">아래 정보를 입력하시면 비밀번호를 메일로 발송해 드립니다.</p>
      <form onSubmit={handleFindPassword} className="row g-3">
      <div className="col-6">
          <label htmlFor="id" className="form-label">아이디</label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)} 
            required
          />
        </div>

        <div className="col-6">
          <label htmlFor="email" className="form-label">이메일</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="col-6">
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

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">비밀번호 찾기</button>
        </div>
      </form>

      {passwordSent && (
        <div className="mt-4 border p-3">
          <p className="mb-0">이메일로 비밀번호를 전송하였습니다.</p>
        </div>
      )}

      {noMatch && !passwordSent && (
        <div className="mt-4 border p-3">
          <p className="mb-0">조회된 정보가 없습니다. 회원가입되지 않은 고객님입니다.</p>
        </div>
      )}
    </div>
  );
};

export default FindPw;
