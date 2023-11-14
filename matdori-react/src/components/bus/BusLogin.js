import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
//import { useSetBusId } from "../../recoil";




const BusLogin = () => {
  const navigate = useNavigate();
  //const setLoggedInBusId = useSetBusId(); // Recoil 설정 함수 가져오기

  const [formData, setFormData] = useState({
    busId: "",
    busPw: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/business/login', formData)
      .then((response) => {
        console.log('로그인 성공:', response.data);
        // 로그인 성공 시 처리
        
        //setLoggedInBusId(response.data.busId); // Recoil로 로그인 정보 설정
        localStorage.setItem('loggedInBusId', response.data.busId);//로컬스토리지에 아이디 값 저장
        console.log('값저장?:', response.data.busId);
        navigate('/');
      })
      .catch((error) => {
        console.error('로그인 실패:', error);
        setLoginError(true);
        setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다");
      });
  };

  const handleRemember = (e) => {
    // 아이디 기억하기 기능 처리
  };

  return (
    <div className="container mt-5">
      <h1>사업체 로그인</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
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
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <input type="checkbox" id="rememberMe" onChange={handleRemember} />
                <label htmlFor="rememberMe" className="form-check-label ms-2">
                  아이디 저장하기
                </label>
              </div>
              <a href="/find-credentials" className="text-decoration-none">
                아이디/비밀번호 찾기
              </a>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusLogin;
