import React from 'react'
import AddQueue from '../Components/AddQueue'
import Navbar from '../Components/Navbar'

function Dashboard() {
    return (
        <>
            <Navbar />
            <div>Dashboard</div>
            <AddQueue />
        </>
    )
}

export default Dashboard