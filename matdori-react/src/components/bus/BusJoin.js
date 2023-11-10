// BusJoin.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const BusJoin = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    busId: "",
    busPw: "",
    busRegNo: "",
    busName: "",
    busTel: "",
    busEmail: "",
    busPost: "",
    busAddr1: "",
    busAddr2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/business/join', formData)
      .then((response) => {
        console.log('회원가입 성공:', response.data);
        // 성공적으로 회원가입한 경우의 처리를 할 수 있어요.
        navigate('/join/success');
      })
      .catch((error) => {
        console.error('회원가입 실패:', error);
        // 회원가입 실패 시의 처리를 할 수 있어요.
      });
  };

  

  return (
    <div className="container mt-5">
      <h1>사업체 회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자 아이디
          </label>
          <input
            type="text"
            className="form-control"
            id="busId"
            name="busId"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busPw" className="form-label">
            사업자 비밀번호
          </label>
          <input
            type="text"
            className="form-control"
            id="busPw"
            name="busPw"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자 등록번호
          </label>
          <input
            type="text"
            className="form-control"
            id="busRegNo"
            name="busRegNo"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자대표명
          </label>
          <input
            type="text"
            className="form-control"
            id="busName"
            name="busName"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자 연락처
          </label>
          <input
            type="text"
            className="form-control"
            id="busTel"
            name="busTel"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자 이메일
          </label>
          <input
            type="text"
            className="form-control"
            id="busEmail"
            name="busEmail"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자 우편번호
          </label>
          <input
            type="text"
            className="form-control"
            id="busPost"
            name="busPost"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            기본주소
          </label>
          <input
            type="text"
            className="form-control"
            id="busAddr1"
            name="busAddr1"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            상세주소
          </label>
          <input
            type="text"
            className="form-control"
            id="busAddr2"
            name="busAddr2"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default BusJoin;
