import React from 'react';
// import { auth } from '../firebase';
import { useContext, useState } from 'react';
import usercontext from '../Context/usercontext';

function Signup() {
    // const context = useContext(usercontext)
    // const { user, setuser } = context;

    // const initialState = {
    //     email: "",
    //     password: ""
    // }
    // const [formdata, setformdata] = useState(initialState)

    // const handlechange = (e) => {
    //     setformdata({
    //         ...formdata,
    //         [e.target.name]: e.target.value.trim(),  //to clear any whitespaces before or after 
    //     })
    // }

    // const signupsubmit = (e) => {
    //     e.preventDefault();

    //     auth.createUserWithEmailAndPassword(formdata.email, formdata.password)
    //         .then((userCredential) => {
    //             // Signed in 
    //             var userr = userCredential.user;
    //             //change userstate in context
    //             setuser(userr)
    //             console.log(user);
    //             // <Redirect to="/home" />
    //         })
    //         .catch((error) => {
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             console.log(errorCode, errorMessage);
    //         });
    // }

    return (
        <div className="">
            Signup
        </div>
    )
}

export default Signup