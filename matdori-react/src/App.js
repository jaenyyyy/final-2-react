
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import BusJoin from "./components/bus/BusJoin";
import JoinSuccess from "./components/bus/JoinSuccess";

function App() {
  
  return (
    <div className="">
      {/* 상단 메뉴 영역 */}
      <Menu/>

      {/* 본문 영역 */}
      <div className="row">
        <div className="col-sm-10 offset-sm-1">
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/bus-join" element={<BusJoin/>} /> {/* BusJoin 컴포넌트 추가 */}
            <Route path="/join/success" element={<JoinSuccess/>} />
          </Routes>
        </div>
      </div>


    
      
      
      </div>
  );
  }


export default App;
