import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import BusJoin from "./components/bus/BusJoin";
import JoinSuccess from "./components/bus/JoinSuccess";
import BusLogin from "./components/bus/BusLogin";
import BusProfile from './components/bus/BusProfile';
import ResHome from './components/restaurant/ResHome';


function App() {
  return (
    <RecoilRoot>
      <div className="">
        {/* 상단 메뉴 영역 */}
        <Menu/>

        {/* 본문 영역 */}
        <div className="row">
          <div className="col-sm-10 offset-sm-1">
            <Routes>
              <Route exact path="/" element={<Home/>}></Route>
              <Route path="/bus-join" element={<BusJoin/>} />
              <Route path="/join/success" element={<JoinSuccess/>} />
              <Route path="/bus-login" element={<BusLogin/>}/>
              <Route path="/bus-profile" element={<BusProfile/>}/>
              <Route path="/restaurant" element={<ResHome/>}/>
        
              
            </Routes>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
