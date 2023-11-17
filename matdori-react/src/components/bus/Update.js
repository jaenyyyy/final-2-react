import { useEffect, useState } from "react";
import axios from 'axios';
import { busIdState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";


const Update = () => {
  // Recoil을 사용하여 busId 상태 가져오기
  const busId = useRecoilValue(busIdState);
  const navigate = useNavigate()

  // 마이페이지에서 보여질 사업자 정보를 담을 상태
  const [businessInfo, setBusinessInfo] = useState({
    busId: '',
    busPw: '',
    busPwCheck: '',
    busRegNo: '',
    busName: '',
    busTel: '',
    busEmail: '',
    busPost: '',
    busAddr1: '',
    busAddr2: ''
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



  // 사업자 정보 조회 함수
  const fetchBusinessInfo = () => {
    axios.get(`http://localhost:8080/business/mypage/busId/${busId}`)
      .then(response => {
        setBusinessInfo(response.data);
      })
      .catch(error => {
        console.error("사업자 정보를 불러오는 중 에러 발생:", error);
      });
  };

  // 페이지 로드 시 사업자 정보 불러오기
  useEffect(() => {
    fetchBusinessInfo();
  }, [busId]); // busId가 바뀔 때마다 재요청


  //정규식이용한 개인정보변경 입력조건 검사
  //입력데이터가 변하면 검사결과가 자동으로 계산되도록 처리
  const checkUpdate = () => {
    //console.log("bus입력정보가 변했습니다");
    const idRegx = /^[a-z][a-z0-9-]{4,19}$/;
    const idMatch = (!businessInfo.busId || businessInfo.busId.length === 0) ? null : idRegx.test(businessInfo.busId);

    const pwRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[A-Za-z0-9!@#$]{8,15}$/;
    const pwMatch = (businessInfo.busPw && businessInfo.busPw.length > 0) ? pwRegx.test(businessInfo.busPw) : null;

    const pwCheckMatch =
      (businessInfo.busPw && businessInfo.busPw.length > 0) &&
      (businessInfo.busPwCheck && businessInfo.busPwCheck.length > 0) &&
      (businessInfo.busPw === businessInfo.busPwCheck);


    const regRegx = /^[0-9]{10}$/;
    const regMatch = (!businessInfo.busRegNo || businessInfo.busRegNo.length === 0) ? null : regRegx.test(businessInfo.busRegNo);

    const telRegex = /^010[1-9][0-9]{7}$/;
    const telMatch = (!businessInfo.busTel || businessInfo.busTel.length === 0) ? null : telRegex.test(businessInfo.busTel);

    const emailRegx = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailMatch = (!businessInfo.busEmail || businessInfo.busEmail.length === 0) ? null : emailRegx.test(businessInfo.busEmail);

    const postRegx = /^[0-9]{5,6}$/;
    const postMatch = (!businessInfo.busPost || businessInfo.busPost.length === 0) ? null : postRegx.test(businessInfo.busPost);

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

  // 모든 입력이 유효한지 확인하는 함수
  const areAllInputsValid = () => {
    const allValid = Object.values(result).every((value) => value === true);
    const emailChangedAndNotValidated = emailChanged && !certValidated; // 이메일이 변경되었고 인증번호가 확인되지 않음
    return allValid && !emailChangedAndNotValidated; // 이메일 변경 시 버튼 비활성화
  };

  // 이메일 변경 여부 상태
  const [emailChanged, setEmailChanged] = useState(false);
  // 인증번호 확인 여부
  const [certValidated, setCertValidated] = useState(false); 

  // 이메일 값이 변경되었을 때 이벤트 처리
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setBusinessInfo({ ...businessInfo, busEmail: newEmail });
    setEmailChanged(true); // 이메일이 변경되었음을 표시
    setCertValidated(false); // 이메일이 변경되면 인증번호 확인 상태 초기화
  };

  const [certSent, setCertSent] = useState(false); // 인증번호 전송 여부
  const [certNumber, setCertNumber] = useState(""); // 입력된 인증번호
  const [validCert, setValidCert] = useState(true); // 인증번호 일치 여부
  

  const handleCertSend = () => {
    console.log('이메일 주소:', businessInfo.busEmail); // 콘솔 로그 추가
    axios.post('http://localhost:8080/react/rest/cert/send', { certEmail: businessInfo.busEmail })
      .then((response) => {
        console.log('인증번호를 이메일로 전송했습니다.');
        setCertSent(true);

         // 인증번호 전송 후 60초 동안 버튼 비활성화
         setTimeout(() => {
          setCertSent(false);
        }, 60000); // 60초
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
      certEmail: businessInfo.busEmail,
      certNumber: certNumber // 입력된 인증번호
    })
      .then((response) => {
        const isValid = response.data.result;
        if (isValid) {
          console.log('인증번호가 일치합니다.');
          setValidCert(true);
          setCertValidated(true); // 인증번호 확인이 완료되었음을 표시
        } else {
          console.log('인증번호가 일치하지 않습니다.');
          setValidCert(false);
          setCertValidated(false); // 인증번호 확인이 실패했음을 표시
        }
      })
      .catch((error) => {
        console.error('인증번호 확인에 실패했습니다:', error);
        // 에러 처리
      });
  };

  // 사업자 정보 수정 함수
  const updateBusinessInfo = () => {
    const allValid = Object.values(result).every((value) => value === true);

    // 인증번호 확인
    checkCertNumber();

    if (allValid) {
      axios
        .put(`http://localhost:8080/business/changeInfo/busId/${busId}`, businessInfo)
        .then((response) => {
          console.log("사업자 정보가 업데이트되었습니다.", response.data);
          navigate('/bus-profile');
          // 업데이트 성공 시 수행할 작업
        })
        .catch((error) => {
          console.error("사업자 정보 업데이트 중 에러 발생:", error);
          // 업데이트 실패 시 수행할 작업
        });
    } else {
      console.log("유효하지 않은 정보가 있어 업데이트를 진행하지 않습니다.");
      // 유효하지 않은 정보에 대한 예외 처리 등을 추가할 수 있습니다.
      // 예를 들어, 사용자에게 알림을 보여줄 수 있습니다.
    }
  };

  return (
    <div className="container mt-5">
      <h1>개인정보 변경</h1>
        {/* onSubmit={handleSubmit} */}
        <div>
          {/* 사업자 정보를 보여주는 수정할수 있는 input들 */}
          <div className="mb-3">
            <label htmlFor="busId">사업자 아이디:</label>
            <input
              type="text"
              className="form-control"
              id="busId"
              name="busId"
              value={businessInfo.busId}
              readOnly
              onBlur={checkUpdate}
              onChange={(e) => setBusinessInfo({ ...businessInfo, busId: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="busPw">사업자 비밀번호:</label>
            <input
              type="password"
              className={`form-control
              ${result.busPw === true ? 'is-valid' : ''}
              ${result.busPw === false ? 'is-invalid' : ''}
            `}
              id="busPw"
              name="busPw"
              //value={businessInfo.busPw}
              onBlur={checkUpdate}

              onChange={(e) => setBusinessInfo({ ...businessInfo, busPw: e.target.value })}
              placeholder="비밀번호는 대문자, 소문자, 숫자, 특수 문자를 각각 하나 이상씩 포함하는 8~15자 사이의 문자로 입력하세요"
              required
            />
            <div className="valid-feedback"></div>
            <div className="invalid-feedback">비밀번호는 대문자, 소문자, 숫자, 특수 문자를 각각 하나 이상씩 포함하는 8~15자 사이의 문자로 입력하세요</div>
          </div>

          <label htmlFor="busPwCheck" className="form-label">
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
            onBlur={checkUpdate}
            onChange={(e) => setBusinessInfo({ ...businessInfo, busPwCheck: e.target.value })}
            required
          />
          <div className="valid-feedback">비밀번호가 일치합니다</div>
          <div className="invalid-feedback">비밀번호가 일치하지 않습니다</div>
        </div>

        <div className="mb-3">
          <label htmlFor="busRegNo">사업자 등록번호:</label>
          <input
            type="text"
            className={`form-control
              ${result.busRegNo === true ? 'is-valid' : ''}
              ${result.busRegNo === false ? 'is-invalid' : ''}
            `}
            id="busRegNo"
            name="busRegNo"
            onBlur={checkUpdate}
            value={businessInfo.busRegNo}
            readOnly
            onChange={(e) => setBusinessInfo({ ...businessInfo, busRegNo: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="busName">사업자 대표명:</label>
          <input
            type="text"
            className="form-control"
            id="busName"
            name="busName"
            value={businessInfo.busName}
            onChange={(e) => setBusinessInfo({ ...businessInfo, busName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busTel">사업자 연락처:</label>
          <input
            type="text"
            className={`form-control
              ${result.busTel === true ? 'is-valid' : ''}
              ${result.busTel === false ? 'is-invalid' : ''}
            `}
            id="busTel"
            name="busTel"
            onBlur={checkUpdate}
            value={businessInfo.busTel}
            onChange={(e) => setBusinessInfo({ ...businessInfo, busTel: e.target.value })}
            placeholder="연락처는 대시 - 없이 입력하세요"
          />
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">연락처는 대시 - 없이 010으로시작하는 11자리 숫자를 입력하세요 예시 : 01051514351</div>
        </div>

        <div className="mb-3">
          <label htmlFor="busEmail">사업자 이메일:</label>
          <input
            type="text"
            className={`form-control
              ${result.busEmail === true ? 'is-valid' : ''}
              ${result.busEmail === false ? 'is-invalid' : ''}
            `}
            id="busEmail"
            name="busEmail"
            value={businessInfo.busEmail}
            onBlur={checkUpdate}
            onChange={(e) => {
              handleEmailChange(e);
              setBusinessInfo((prevBusinessInfo) => ({
                ...prevBusinessInfo,
                busEmail: e.target.value,
              }));
            }}
          />
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">이메일 형식이 맞지 않습니다 예시 : matdori@naver.com </div>
        </div>


        {/* 이메일이 변경되었을 때만 인증 번호 입력 필드 보이기 */}
        {emailChanged && (
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
        )}


        <div className="mb-3">
          <label htmlFor="busPost">사업자 우편번호:</label>
          <input
            type="text"
            className={`form-control
              ${result.busPost === true ? 'is-valid' : ''}
              ${result.busPost === false ? 'is-invalid' : ''}
            `}
            id="busPost"
            name="busPost"
            value={businessInfo.busPost}
            onBlur={checkUpdate}
            onChange={(e) => setBusinessInfo({ ...businessInfo, busPost: e.target.value })}
            required
          />
          <div className="valid-feedback"></div>
          <div className="invalid-feedback">우편번호 5~6자리 숫자를 입력하세요 </div>
        </div>

        <div className="mb-3">
          <label htmlFor="busAddr1">사업자 기본주소:</label>
          <input
            type="text"
            className="form-control"
            id="busAddr1"
            name="busAddr1"
            value={businessInfo.busAddr1}
            onChange={(e) => setBusinessInfo({ ...businessInfo, busAddr1: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="busAddr2">사업자 상세주소:</label>
          <input
            type="text"
            className="form-control"
            id="busAddr2"
            name="busAddr2"
            value={businessInfo.busAddr2}
            onChange={(e) => setBusinessInfo({ ...businessInfo, busAddr2: e.target.value })}
          />
        </div>
        <button
          onClick={updateBusinessInfo}
          type="submit"
          className="btn btn-primary"
          disabled={!areAllInputsValid()}
        >
          정보 수정
        </button>
        {!areAllInputsValid() && (
          <div className="alert alert-danger mt-2" role="alert">
            완료되지 않은 항목이 있습니다.
          </div>
        )}
    </div >
  );
};

export default Update;
