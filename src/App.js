import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import usercontext from './Context/usercontext';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { auth } from './firebase';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

function App() {

  const context = useContext(usercontext)
  const { user, setuser } = context;

  setuser(auth.currentUser)
  // setuser(true);


  auth.onAuthStateChanged(function (user) {
    if (user) {
      setuser(user)
    }
  })

  // something
  return (
    <Fragment>
      <BrowserRouter>
        <div>
          <Routes>
            {!user ?   // to show content as per login status
              (
                <>
                  {/* redirect to login if no user*/}
                  <Route exact path="/" element={<Navigate to="/login" />} />
                  <Route exact path="/home" element={<Navigate to="/login" />} />
                  <Route exact path="/dashboard" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </>
              ) :
              (
                <>
                  <Route path="/login" element={<Navigate to="/login" />} />
                  <Route path="/signup" element={<Navigate to="/home" />} />
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route exact path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </>
              )}
          </Routes>

        </div>

      </BrowserRouter>
    </Fragment>
  );
}

export default App;
