import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserState from './Context/UserState';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <App />
    </UserState>
  </React.StrictMode>,
  document.getElementById('root')
);

