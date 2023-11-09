import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/united/bootstrap.min.css';

//Router는 React 앱을 여러 페이지로 분할하여 사용하도록 만드는 기술 
import {HashRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
      <App />
    </HashRouter>
);

reportWebVitals();
