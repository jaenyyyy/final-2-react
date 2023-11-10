// BusJoin.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const BusJoin = () => {
  const navigate = useNavigate();

  //데이터입력
  const [formData, setFormData] = useState({
    busId: "",
    busPw: "",
    busPwCheck: "",
    busRegNo: "",
    busName: "",
    busTel: "",
    busEmail: "",
    busPost: "",
    busAddr1: "",
    busAddr2: "",
  });

  //회원가입창 입력조건 검사결과
  const [result, setResult] = useState({
    busId: null,
    busPw: null,
    busPwCheck: null,
    busRegNo: null,
    busName: null,
    busTel: null,
    busEmail: null,
    busPost: null,
    busAddr1: null,
    busAddr2: null,
  });

  //정규식이용한 회원가입창 입력조건 검사
  //입력데이터가 변하면 검사결과가 자동으로 계산되도록 처리
  const checkJoin = () => {
    //console.log("bus입력정보가 변했습니다");
    const idRegx = /^[a-z][a-z0-9-]{4,19}$/;
    const idMatch = formData.busId.length === 0 ? null : idRegx.test(formData.busId);

    const pwRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[A-Za-z0-9!@#$]{8,15}$/;
    const pwMatch = formData.busPw.length === 0 ? null : pwRegx.test(formData.busPw);

    const pwCheckMatch =
      formData.busPw.length === 0 ? null : formData.busPwCheck.length > 0 && formData.busPw === formData.busPwCheck;
      
    const regRegx = /^[0-9]{10}$/;
    const regMatch = formData.busRegNo.length === 0 ? null : regRegx.test(formData.busRegNo);

    const telRegex = /^010[1-9][0-9]{7}$/;
    const telMatch = formData.busTel.length === 0 ? null : telRegex.test(formData.busTel);

    const emailRegx = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailMatch = formData.busEmail.length === 0 ? null : emailRegx.test(formData.busEmail);

    const postRegx = /^[0-9]{5,6}$/;
    const postMatch = formData.busPost.length === 0 ? null : postRegx.test(formData.busPost);

    setResult({
      busId: idMatch,
      busPw: pwMatch,
      busPwCheck: pwCheckMatch,
      busRegNo: regMatch,
      busTel: telMatch,
      busEmail: emailMatch,
      busPost: postMatch
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // if (name === "busPw" || name === "busPwCheck") {
    //   checkJoin(); // 비밀번호나 확인값 변경 시 확인 함수 호출
    // }

    //checkJoin();
    
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/business/join', formData)
      .then((response) => {
        console.log('회원가입 성공:', response.data);
        // 성공적으로 회원가입한 경우의 처리
        navigate('/join/success');
      })
      .catch((error) => {
        console.error('회원가입 실패:', error);
        // 회원가입 실패 시의 처리
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
            className={`form-control
              ${result.busId === true ? 'is-valid' : ''}
              ${result.busId === false ? 'is-invalid' : ''}
            `}
            id="busId"
            name="busId"
            value={formData.busId} onChange={handleChange}
            onBlur={checkJoin}
            required
          />
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">아이디는 영문소문자로 시작하는 영문,숫자 5~20자로 입력하세요 </div>
        </div>

        <div className="mb-3">
          <label htmlFor="busPw" className="form-label">
            사업자 비밀번호
          </label>
          <input
            type="password"
            className={`form-control
            ${result.busPw === true ? 'is-valid' : ''}
            ${result.busPw === false ? 'is-invalid' : ''}
          `}
            id="busPw"
            name="busPw"
            onChange={handleChange}
            onBlur={checkJoin}
            required
          />
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">비밀번호는 대문자, 소문자, 숫자, 특수 문자를 각각 하나 이상씩 포함하는 8~15자 사이의 문자로 입력하세요</div>
        </div>

        <div className="mb-3">
        <label htmlFor="busPw" className="form-label">
          비밀번호 확인
        </label>
        <input
          type="password"
          className={`form-control
              ${result.busPwCheck === true ? "is-valid" : ""}
              ${result.busPwCheck === false ? "is-invalid" : ""}
            `}
          id="busPwCheck"
          name="busPwCheck"
          onChange={handleChange}
          onBlur={checkJoin}
          required
        />
        <div className="valid-feedback">비밀번호가 일치합니다</div>
        <div className="invalid-feedback">비밀번호가 일치하지 않습니다</div>
      </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자 등록번호
          </label>
          <input
            type="text"
            className={`form-control
              ${result.busRegNo === true ? 'is-valid' : ''}
              ${result.busRegNo === false ? 'is-invalid' : ''}
            `}
            id="busRegNo"
            name="busRegNo"
            onChange={handleChange}
            onBlur={checkJoin}
            required 
          />
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">사업자 등록 번호 10자리숫자를 입력하세요 예시 : 1234567890</div>
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자대표명
          </label>
          <input
            type="text"
            className= "form-control"
            id="busName"
            name="busName"
            onChange={handleChange}
            onBlur={checkJoin}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자 연락처
          </label>
          <input
            type="text"
            className={`form-control
              ${result.busTel === true ? 'is-valid' : ''}
              ${result.busTel === false ? 'is-invalid' : ''}
            `}
            id="busTel"
            name="busTel"
            onChange={handleChange}
            onBlur={checkJoin}
          />
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">연락처는 대시 - 없이 010으로시작하는 11자리 숫자를 입력하세요 예시 : 01051514351</div>
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자 이메일
          </label>
          <input
            type="text"
            className={`form-control
              ${result.busEmail === true ? 'is-valid' : ''}
              ${result.busEmail === false ? 'is-invalid' : ''}
            `}
            id="busEmail"
            name="busEmail"
            onChange={handleChange}
            onBlur={checkJoin}
            required
          />
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">이메일 형식이 맞지 않습니다 예시 : matdori@naver.com </div>
        </div>

        <div className="mb-3">
          <label htmlFor="busId" className="form-label">
            사업자 우편번호
          </label>
          <input
            type="text"
            className={`form-control
              ${result.busPost === true ? 'is-valid' : ''}
              ${result.busPost === false ? 'is-invalid' : ''}
            `}
            id="busPost"
            name="busPost"
            onChange={handleChange}
            onBlur={checkJoin}
            required
          />
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">우편번호 5~6자리 숫자를 입력하세요 </div>
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
            onBlur={checkJoin}
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
            onBlur={checkJoin}
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
