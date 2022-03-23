import React from 'react'
import { useContext, useState } from 'react';
import { auth } from '../firebase';
import usercontext from '../Context/usercontext';

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

        auth.signInWithEmailAndPassword(formdata.email, formdata.password)
            .then((userCredential) => {
                // Signed in
                var userr = userCredential.user;
                // change user state in context
                setuser(userr)
                console.log(user);
                // <Redirect to="/home" />;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className="">
            Login Page
        </div>
    )
}

export default Login