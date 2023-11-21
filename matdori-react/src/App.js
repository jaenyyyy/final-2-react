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


import FindId from './components/bus/FindId';
import FindPw from './components/bus/FindPw';
import MyResList from './components/bus/MyResList';
import MenuByRes from './components/restaurant/menu/MenuByRes';
import Update from './components/bus/Update';
import BusQuit from './components/bus/BusQuit';
import BusQuitSuccess from './components/bus/BusQuitSuccess';
import ResAdd from './components/bus/ResAdd';


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
              <Route path="/bus-update" element={<Update/>}/>
              <Route path="/bus-resAdd" element={<ResAdd/>}/>

              <Route path="/restaurant/menu/list" element={<MenuByRes/>}/>
              <Route path="/business/:busId/:resNo" element={<ResHome />} />
              <Route path="/business/:busId/:resNo/menu" element={<MenuByRes />} />

              <Route path='/find-id' element={<FindId/>}/>
              <Route path='/find-pw' element={<FindPw/>}/>
              <Route path='/bus-quit' element={<BusQuit/>}/>
              <Route path='/bus-quitsuccess' element={<BusQuitSuccess/>}/>
              <Route path='/bus-myreslist' element={<MyResList/>}/>

            </Routes>
        
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
