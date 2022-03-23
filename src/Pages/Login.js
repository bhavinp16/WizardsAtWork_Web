import React from 'react'
import { useContext, useState } from 'react';
import { auth } from '../firebase';
import usercontext from '../Context/usercontext';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const context = useContext(usercontext)
    const { user, setuser } = context

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

    const logind = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, formdata.email, formdata.password)
            .then((userCredential) => {
                // Signed in 
                const userr = userCredential.user;
                setuser(userr);
                console.log(user);
                // <Navigate to="/home" />
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

    }

    return (
        <div className="">
            Login Page
            <label htmlFor="EmailId">Email ID: </label>
            <input id="EmailId" name='email' onChange={handlechange} type="text" value={formdata.email} />

            <label htmlFor="password">Password</label>
            <input id="password" name='password' onChange={handlechange} type="password" value={formdata.password} />

            <button onClick={logind}>Login</button>
        </div>
    )
}

export default Login