import React from 'react';
import { auth } from '../firebase';
import { Link, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import usercontext from '../Context/usercontext';
import { createUserWithEmailAndPassword, FacebookAuthProvider } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './signup.css';



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


    const googleHandler = (e) => {
        e.preventDefault()
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setuser(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential);
                alert(errorMessage);
                // ...
            });
    }

    const facebookHandler = (e) => {
        e.preventDefault();
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                // Signed in
                const userr = userCredential.user;
                setuser(userr);
                console.log(user);
                <Navigate to="/dashboard" />
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);
            });
    }


    return (
        <>
            <div class="sidenav">
                <div class="login-main-text">
                    <h1>Queue Management System<br /><br /></h1>
                    <h2>Signup Page</h2>
                    <p>Register from here to access.</p>
                </div>
            </div>
            <div class="main">
                <div class="col-md-6 col-sm-12 ">
                    <div class="login-form mx-3 my-4 shadow p-5">
                        <h2>Signup Form</h2>
                        <br /><br />
                        <form>
                            <div className="container ">
                                <div class="form-group">
                                    <label> Email Id</label>
                                    <input type="text" name="email" value={formdata.email} onChange={handlechange} class="form-control" placeholder="User Name" />
                                </div>
                                <br />
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" name='password' onChange={handlechange} value={formdata.password} class="form-control" placeholder="Password" />
                                </div>
                                <br /><br />

                                <button type="submit" onClick={signupsubmit} class="btn btn-dark btn-lg d-flex justify-content-center d-flex align-items-center">Register</button>
                            </div>

                            <br /><br />
                            <hr />
                            <br />

                            <p className='d-flex justify-content-center'>SignIn Using Other Options</p>
                            <div className='d-flex justify-content-center'>
                                <button className='btn btn-danger m-2' onClick={googleHandler}>
                                    <div className='d-flex p-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                        </svg>
                                    </div>
                                </button>
                                <button className='btn btn-primary m-2' onClick={facebookHandler}>
                                    <div className='d-flex p-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            <br /><br />

                            <Link to="/login" class="btn btn-secondary btn-md btn-block d-flex justify-content-center">Already Have an Account</Link>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup

