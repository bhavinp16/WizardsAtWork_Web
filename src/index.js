import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserState from './Context/UserState';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider placement="top-right">
      <UserState>
        <App />
      </UserState>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

