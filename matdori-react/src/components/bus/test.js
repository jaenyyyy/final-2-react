// BusJoin.js

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const BusJoin = () => {
  const navigate = useNavigate();
  const inputRef = useRef(); 

    // 중복된 아이디 상태
    const [duplicateId, setDuplicateId] = useState(false);

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
    if (name === "busId") {
      setDuplicateId(false); // 아이디가 변경될 때 중복 상태 초기화
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // if (name === "busPw" || name === "busPwCheck") {
    //   checkJoin(); // 비밀번호나 확인값 변경 시 확인 함수 호출
    // }

    //checkJoin();
    
  };


  const [certSent, setCertSent] = useState(false); // 인증번호 전송 여부
  const [certNumber, setCertNumber] = useState(""); // 입력된 인증번호
  const [validCert, setValidCert] = useState(true); // 인증번호 일치 여부

  const handleCertSend = () => {
    console.log('이메일 주소:', formData.busEmail); // 콘솔 로그 추가
    axios.post('http://localhost:8080/react/rest/cert/send', { certEmail: formData.busEmail })
      .then((response) => {
        console.log('인증번호를 이메일로 전송했습니다.');
        setCertSent(true);
      })
      .catch((error) => {
        console.error('인증번호 전송에 실패했습니다:', error);
        // 에러 처리
      });
  };
  

  const handleCertInputChange = (e) => {
    // 입력된 인증번호 상태 변경
    setCertNumber(e.target.value);
  };

  const checkCertNumber = () => {
    axios.post('http://localhost:8080/react/rest/cert/check', {
      certEmail: formData.busEmail,
      certNumber: certNumber // 입력된 인증번호
    })
      .then((response) => {
        const isValid = response.data.result;
        if (isValid) {
          console.log('인증번호가 일치합니다.');
          setValidCert(true);
        } else {
          console.log('인증번호가 일치하지 않습니다.');
          setValidCert(false);
        }
      })
      .catch((error) => {
        console.error('인증번호 확인에 실패했습니다:', error);
        // 에러 처리
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

        // 인증번호 확인
        checkCertNumber();
  
    axios.get(`http://localhost:8080/business/check/${formData.busId}`)
      .then((response) => {
        if (response.data.exists) {
          console.log('중복된 아이디입니다. 다른 아이디를 사용하세요.');
          // 중복된 아이디 처리
          setDuplicateId(true); // 중복된 아이디 발견 시 duplicateId를 true로 설정
          inputRef.current.focus(); // 중복 오류 발생 시 해당 입력 필드로 포커스 이동
        } else {
          setDuplicateId(false); // 중복 아이디가 없을 시 duplicateId를 false로 설정
          // 중복된 아이디가 없으면 회원가입 진행
          axios.post('http://localhost:8080/business/join', formData)
            .then((response) => {
              console.log('회원가입 성공:', response.data);
              navigate('/join/success');
            })
            .catch((error) => {
              console.error('회원가입 실패:', error);
              // 회원가입 실패 시의 처리
            });
        }
      })
      .catch((error) => {
        console.error('아이디 중복 확인 실패:', error);
        // 중복 확인 실패 시의 처리
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
              ${result.busId === false || duplicateId ? 'is-invalid' : ''}
            `}
            id="busId"
            name="busId"
            value={formData.busId} onChange={handleChange}
            onBlur={checkJoin}
            placeholder="아이디는 영문소문자로 시작하는 영문,숫자 5~20자로 입력하세요"
            required
            ref={inputRef} // ref 설정
          />
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">
    {duplicateId ? '이미 사용중인 아이디 입니다.' : '아이디는 영문소문자로 시작하는 영문,숫자 5~20자로 입력하세요'}
  </div>
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
            placeholder="비밀번호는 대문자, 소문자, 숫자, 특수 문자를 각각 하나 이상씩 포함하는 8~15자 사이의 문자로 입력하세요"
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
            placeholder="사업자 등록 번호 10자리숫자를 입력하세요"
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
            placeholder="연락처는 대시 - 없이 입력하세요"
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
          <label htmlFor="certNumber" className="form-label">
            인증번호
          </label>
          <div className="input-group">
            <input
              type="text"
              className={`form-control
                ${!validCert ? "is-invalid" : ""}
              `}
              id="certNumber"
              name="certNumber"
              value={certNumber}
              onChange={handleCertInputChange}
              onBlur={checkCertNumber}
              placeholder="인증번호를 입력하세요"
              required
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleCertSend}
              disabled={certSent} // 이미 인증번호를 보냈다면 버튼 비활성화
            >
              {certSent ? "재전송" : "인증번호 전송"}
            </button>
            <div className="invalid-feedback">인증번호가 일치하지 않습니다.</div>
          </div>
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
            placeholder="우편번호 5~6자리 숫자를 입력하세요"
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