import React from 'react';

const BusQuitSuccess = () => {
    return (
        <div className="container mt-5 text-center">
            <h1 className="text-center mb-4">회원 탈퇴 완료</h1>
            <p className="text-center">
                회원 탈퇴가 정상적으로 완료되었습니다.<br/>
                이제 해당 아이디로 로그인할 수 없습니다. 등록하신 정보가 삭제되었습니다.
            </p>
            <a href="#/">매인화면으로</a>
        </div>
    );
}

export default BusQuitSuccess;
