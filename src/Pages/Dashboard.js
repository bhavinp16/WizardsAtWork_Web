import React from 'react'
//import AddQueue from '../Components/AddQueue'
import Navbar from '../Components/Navbar'
import Cardfunc from '../Pages/Card'

function Dashboard() {
    return (
        <>
            <Navbar />
            <div className="App">
                <div class="d-flex">
                    <Cardfunc />
                    <Cardfunc />
                    <Cardfunc />
                </div>
            </div>
        </>


    )
}

export default Dashboard