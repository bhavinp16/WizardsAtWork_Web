import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import usercontext from './Context/usercontext';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { auth } from './firebase';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import { onAuthStateChanged } from 'firebase/auth';
import Queue from './Pages/Queue';

function App() {

  const context = useContext(usercontext)
  const { user, setuser } = context;

  setuser(auth.currentUser)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setuser(user);
      // const uid = user.uid;
    } else {
      Navigate('/login');
    }
  });

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
                  {/* <Route exact path="/home" element={<Navigate to="/login" />} /> */}
                  <Route exact path="/dashboard" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/queue/:qid" element={<Navigate to="/login" />} />
                </>
              ) :
              (
                <>
                  <Route path="/login" element={<Navigate to="/dashboard" />} />
                  <Route path="/signup" element={<Navigate to="/dashboard" />} />
                  <Route path="/" element={<Navigate to="/home" />} />
                  {/* <Route exact path="/" element={<Dashboard />} /> */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/queue/:qid" element={<Queue />} />
                </>
              )}
          </Routes>

        </div>

      </BrowserRouter>
    </Fragment>
  );
}

export default App;
