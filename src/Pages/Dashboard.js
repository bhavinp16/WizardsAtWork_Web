import React from 'react'
//import AddQueue from '../Components/AddQueue'
import Navbar from '../Components/Navbar'
import Cardfunc from '../Pages/Card'
import { PieChart } from 'react-minimal-pie-chart';

function Dashboard() {
    return (
        <>
            <Navbar/>
            <div className="App">
            <div class="d-flex">            
            <Cardfunc/>
            <Cardfunc/>
            <Cardfunc/>
            </div>
            </div>
            
            <PieChart radius={10} animate={true}
            data={[
                { title: 'One', value: 10, color: '#E38627' },
                { title: 'Two', value: 15, color: '#C13C37' },
                { title: 'Three', value: 20, color: '#6A2135' },
            ]}
            />;
        </>
            
        
    )
}

export default Dashboard