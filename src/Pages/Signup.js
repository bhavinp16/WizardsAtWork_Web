import React from 'react';
import { auth } from '../firebase';
import { Link, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import usercontext from '../Context/usercontext';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {
    const context = useContext(usercontext)
    const { user, setuser } = context;

    const initialState = {
        email: "",
        password: ""
    }
    const [formdata, setformdata] = useState(initialState)

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value.trim(),  //to clear any whitespaces before or after 
        })
    }

    const signupsubmit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, formdata.email, formdata.password)
            .then((userCredential) => {
                // Signed in 
                var userr = userCredential.user;
                //change userstate in context
                setuser(userr)
                alert("User Created", user);

                <Navigate to="/dashboard" />
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className="container">
            <div className="">
                Signup Page
                <label htmlFor="EmailId">Email ID: </label>
                <input id="EmailId" name='email' onChange={handlechange} type="text" value={formdata.email} />

                <label htmlFor="password">Password</label>
                <input id="password" name='password' onChange={handlechange} type="password" value={formdata.password} />

                <button onClick={signupsubmit}>Login</button>
            </div>
            <div>
                <Link to='/login'>Already Have An Account</Link>
            </div>
        </div>
    )
}

export default Signup