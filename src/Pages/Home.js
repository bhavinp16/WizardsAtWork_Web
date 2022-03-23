import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import { CssBaseline } from '@material-ui/core';
import image from "./bg.jpg"; 
import About from '../Components/About';
function Home() {
    return (
        <div>
            <div className="abc" style={{backgroundImage:`url(${image})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
              <Navbar />
              <CssBaseline />
              <Header />
            </div>
            <div className="abc" style={{backgroundColor:'#2196f3' }}>
              <CssBaseline />
              <About />
            </div>

        </div>
            
            
    )
}

export default Home