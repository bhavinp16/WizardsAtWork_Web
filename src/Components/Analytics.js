import React, { useState, useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart';

// route /queue/:qid
function Analytics() {
    // Specific to Queue
    // Pie Chart of Tokens Processed, Issued, Remaining to Issue
    // Line Chart of Average Time of Queue over time

    const [tokenData, settokenData] = useState({
        tokenProcessed: 0,
        tokenIssued: 0,
        tokenRemaining: 0,
    });
    const [averageTime, setAverageTime] = useState([]);
    // REMINDER  - To change the queue schema to push the avg time of that day with that days date as key in a array 


    // update the states with the data from the database by doing async functions for the same 
    useEffect(() => {
        async function getData() {
            // write firebase query here to fetch data the token data;

            // write firebase query here to fetch the average waiting time array from queue collection

        }
        getData();
    }, []);

    return (
        <div>
            <h1>Analytics</h1>
            <div className='d-flex justify-content-center align-content-center'>
                <div className="d-flex flex-column container justify-content-center align-content-center">
                    <h5> Token Count Status</h5>
                    {/* UI for PIE CHART */}
                    <PieChart className='' style={{
                        width: '250px',
                        height: '250px',
                    }}
                        data={[
                            { title: 'Tokens Processed', value: 40, color: '#E38627', key: 1, dataEntry: { title: 'Tokens Processed' } },
                            { title: 'Tokens Waiting', value: 30, color: '#C13C37', key: 2, dataEntry: { title: 'Tokens Waiting' } },
                            { title: 'Tokens Remaining To Be Issued', value: 30, color: '#6A2135', key: 3, dataEntry: { title: 'Tokens Remaining To Be Issued' } },
                        ]}
                    />


                </div>
                <br />

                <div className="container">
                    Average Token Processing Time
                    {/* UI For LINE CHART */}
                </div>
            </div>
        </div>
    )

}

export default Analytics