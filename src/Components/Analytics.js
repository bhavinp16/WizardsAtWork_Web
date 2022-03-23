import React, { useState, useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from "firebase/firestore";
import db from '../firebase';

// route /queue/:qid
function Analytics() {
    // Specific to Queue

    const { qid } = useParams();

    const [queueData, setqueueData] = useState({
        averageWaitingTime: 0, // in minutes
        arrTokens: [],
        maxTokens: 0,
        queueDetails: {},
        status: true,
        tokenProcessed: 0,
        tokenIssued: 0,
        tokenRemaining: 0,
    });

    // update the states with the data from the database by doing async functions for the same 
    useEffect(() => {
        async function getData() {
            // write firebase query here to fetch data for that queue;
            const unsub = onSnapshot(
                doc(db, "queue", qid),
                { includeMetadataChanges: true },
                (doc) => {
                    setqueueData({
                        ...queueData,
                        averageWaitingTime: doc.data().Avg_wait_time,
                        arrTokens: doc.data().arr_tokens,
                        maxTokens: doc.data().max_tokens,
                        queueDetails: doc.data().queue_details,
                        status: doc.data().status,
                        tokenProcessed: doc.data().token_distributed - doc.data().arr_tokens.length,
                        tokenIssued: doc.data().token_distributed,
                        tokenRemaining: doc.data().max_tokens - doc.data().token_distributed,
                    });
                });
        }
        getData();
    }, [qid]);

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

                    {/* Queue Details */}
                    <div className="">
                        <h5>Queue Details</h5>
                        <h2>Category: {queueData.queueDetails.category}</h2>
                        <h2>Name: {queueData.queueDetails.name}</h2>
                    </div>

                    {/* Token Data */}
                    <div className="">
                        <h2>Tokens Processed: {queueData.tokenProcessed}</h2>
                        <h2>Tokens Issued: {queueData.tokenIssued}</h2>
                        <h2>Tokens Remaining: {queueData.tokenRemaining}</h2>
                    </div>

                    {/* Queue Stats */}
                    <div className="">
                        <h2>Average Waiting Time: {queueData.averageWaitingTime} minutes</h2>
                        <h2>Max Tokens: {queueData.maxTokens}</h2>
                        <h2>Status: {queueData.status ? "Running" : "Stopped"}</h2>
                    </div>

                </div>

            </div>
        </div>
    )

}

export default Analytics

