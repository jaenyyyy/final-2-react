import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import matdori from '../assets/images/matdori.png';
import "bootstrap/dist/js/bootstrap.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { busIdState } from "../recoil";
import { IoMdLogOut } from "react-icons/io";



const Menu = (props) => {
    const location = useLocation();
    const [busId, setBusId] = useRecoilState(busIdState);

    const handleLogout = () => {
        localStorage.removeItem('loggedInBusId'); // 로그아웃: 로컬 스토리지에서 아이디 제거
        localStorage.removeItem('loggedInToken'); // 로컬 스토리지에서 토큰 제거
        setBusId(''); // Recoil 상태 비우기
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col ms-4" style={{ marginTop: '70px' }}>
                    </div>
                    <div className="col text-center">
                    <NavLink className="navbar-brand" to="bus-myreslist">
                        <img src={matdori} width={250} />
                    </NavLink>
                    </div>
                    <div className="col text-end me-4" style={{ marginTop: '70px' }}>
                        {!busId ? (
                            <>

                                <NavLink className={`nav-link ${location.pathname === '/bus-join' ? 'active' : ''}`} to="/bus-join">사업체회원가입</NavLink>
                                <NavLink className={`nav-link ${location.pathname === '/bus-login' ? 'active' : ''}`} to="/bus-login">사업체로그인</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className="nav-link" to="/" onClick={handleLogout}><IoMdLogOut style={{ color: '#FFB416', fontSize: '4em' }} /></NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg bg-warning" data-bs-theme="">
    <div className="container-fluid justify-content-center">
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto"> 
                <li className="nav-item me-4">
                    <NavLink className={`nav-link ${location.pathname === '/bus-myreslist' ? 'active' : ''}`} to="/bus-myreslist">내 매장목록</NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className={`nav-link ${location.pathname === '/Bus-quit' ? 'active' : ''}`} to="/bus-quit">탈퇴하기</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={`nav-link ${location.pathname === '/Bus-profile' ? 'active' : ''}`} to="/Bus-profile">프로필</NavLink>
                </li>
            </ul>
        </div>
    </div>
</nav>




        </div>
    );
};

export default Menu;