import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { busIdState } from "../../recoil";
import { FaUserTie } from "react-icons/fa";

const BusLogin = () => {
  const [formData, setFormData] = useState({
    busId: "",
    busPw: "",
  });
  const [user, setUser] = useRecoilState(busIdState);

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSuccess = (data) => {
    const { busId, token } = data;
    localStorage.setItem('loggedInBusId', busId);
    localStorage.setItem('loggedInToken', token);
    setUser(busId); // Recoil 상태 업데이트
    console.log(busId, token);
    navigate('/bus-myreslist');
  };

  const handleLoginFailure = (error) => {
    console.error('로그인 실패:', error);
    setLoginError(true);
    setErrorMessage("비밀번호가 일치하지 않습니다");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/business/login', formData)
      .then((response) => {
        handleLoginSuccess(response.data); // 로그인 성공 시 처리
      })
      .catch((error) => {
        handleLoginFailure(error); // 로그인 실패 시 처리
      });
  };

  return (
    <div className="container mt-5 mb-4">
      <div className="row mt-4 offset-3">
        <h1><FaUserTie style={{ color: '#FFB416' }} />Login</h1>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-4">
              <label htmlFor="busId" className="form-label">
                사업자 아이디
              </label>
              <input
                type="text"
                className={`form-control ${loginError ? 'is-invalid' : ''}`}
                id="busId"
                name="busId"
                value={formData.busId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="busPw" className="form-label">
                사업자 비밀번호
              </label>
              <input
                type="password"
                className={`form-control ${loginError ? 'is-invalid' : ''}`}
                id="busPw"
                name="busPw"
                value={formData.busPw}
                onChange={handleChange}
                required
              />
              {loginError && (
                <div className="invalid-feedback">{errorMessage}</div>
              )}
            </div>
            {/* 에러 메시지 추가 */}
            <div className="mb-3">
              <div className="invalid-feedback">{errorMessage}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {/* 기억하기 기능 추가 */}
                {/* <input type="checkbox" id="rememberMe" onChange={handleRemember} />
                <label htmlFor="rememberMe" className="form-check-label ms-2">
                  아이디 저장하기
                </label> */}
              </div>

            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-warning mt-3 w-100">
                로그인
              </button>
              <hr className="my-4 border border-warning" />
              <div className="d-flex justify-content-between align-items-center mt-3">
                {/* 왼쪽에 회원가입 링크 */}
                <Link to="/bus-join" className="text-decoration-none">
                  회원가입
                </Link>

                {/* 오른쪽에 아이디 및 비밀번호 찾기 링크 */}
                <div>
                  <a href="/#/find-id" className="text-decoration-none me-2">아이디 찾기</a>
                  <a href="/#find-pw" className="text-decoration-none">비밀번호 찾기</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusLogin;
