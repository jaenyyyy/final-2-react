import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import matdori from '../assets/images/matdori.png';
import "bootstrap/dist/js/bootstrap.js";



const Menu = (props) => {
    const location = useLocation();

    return (
        <div>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col ms-4" style={{ marginTop: '70px' }}>
                        <NavLink className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">북마크</NavLink>
                    </div>
                    <div className="col text-center">
                        <img src={matdori} width={250} />
                    </div>
                    <div className="col text-end me-4" style={{ marginTop: '70px' }}>
                        <NavLink className={`nav-link ${location.pathname === '/bus-join' ? 'active' : ''}`} to="/bus-join">사업체회원가입</NavLink>
                        <NavLink className={`nav-link ${location.pathname === '/bus-login' ? 'active' : ''}`} to="/bus-login">사업체로그인</NavLink>
                        <NavLink className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">로그인</NavLink>
                    </div>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg bg-warning" data-bs-theme="">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">파이널</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">메뉴1</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">메뉴2</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">메뉴3</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-sm-2" type="search" placeholder="검색어를 입력하세요" />
                            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Menu;