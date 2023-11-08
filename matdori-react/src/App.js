import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { busIdState } from './recoil';

function App() {
  //recoil 저장소에 있는 값을 불러오는 코드
  //const [busId, setBusId] = useState("...");//현재 컴포넌트에서만 사용하는 state
  const [busId, setBusId] = useRecoilState(busIdState);//recoil 저장소에 있는 busIdState를 불러와서 사용(바꾸면 모든 화면에서 바뀜)

  const login = ()=>{
    //id랑 pw를 서버로 보내서 맞으면 갱신하도록 하는 axios 코드
    setBusId('testuser1');
  };
  const logout = ()=>{
    setBusId('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {busId.length === 0 ? '비회원' : '회원'}
          {/* {busId.length === 0 ? <logoutView/> : <loginView/>} */}
        </a>
          <button onClick={login}>로그인</button>
          <button onClick={logout}>로그아웃</button>
      </header>
    </div>
  );
}

export default App;
