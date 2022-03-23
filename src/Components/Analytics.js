import React, { useState, useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import db from '../firebase';
import InfoCard from './InfoCard';

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
        prevTokenTimestamp: null,
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
                        prevTokenTimestamp: doc.data().prev_timestamp,
                    });
                });
        }
        getData();
    }, [qid]);

    const handleStatusChange = (e) => {
        e.preventDefault();
        // write firebase query here to update the status of the queue
        const queueRef = doc(db, 'queue', qid);
        setDoc(queueRef, { status: !queueData.status }, { merge: true });
    }

    const handleTokenChange = (e) => {
        e.preventDefault();

        // calculate the token's current time
        // update the waiting time
        // remove first token from the arr_tokens
        // increment tokens distributed

        const currTimestamp = Date.now() / 1000 | 0;
        const prevTimestamp = queueData?.prevTokenTimestamp['seconds'];

        const res = Math.abs(currTimestamp - prevTimestamp) / 1000;

        const currentTokenTime = Math.floor(res); // in mins

        const queueRef = doc(db, 'queue', qid);
        setDoc(queueRef, {
            Avg_wait_time: (queueData.averageWaitingTime + currentTokenTime) / (queueData.tokenProcessed + 1),
            arr_tokens: queueData.arrTokens.slice(1),
            token_distributed: queueData.tokenIssued + 1,
            prev_timestamp: currTimestamp,
        }, { merge: true });

        alert("Token Processed");
    }


    return (
        <div>
            <h1>Queue Details</h1>
            {/* Queue Details */}
            <div className="">
                <h2>Category: {queueData.queueDetails.category}</h2>
                <h2>Name: {queueData.queueDetails.name}</h2>
            </div>

            <div className='d-flex justify-content-center align-content-center'>
                <div className="d-flex flex-column container justify-content-center align-content-center">
                    {/* <h5> Token Count Status</h5> */}
                    {/* UI for PIE CHART
                    <PieChart className='' style={{
                        width: '250px',
                        height: '250px',
                    }}
                        data={[
                            { title: 'Tokens Processed', value: 40, color: '#E38627', key: 1, dataEntry: { title: 'Tokens Processed' } },
                            { title: 'Tokens Waiting', value: 30, color: '#C13C37', key: 2, dataEntry: { title: 'Tokens Waiting' } },
                            { title: 'Tokens Remaining To Be Issued', value: 30, color: '#6A2135', key: 3, dataEntry: { title: 'Tokens Remaining To Be Issued' } },
                        ]}
                    /> */}


                    {/* Current Token Status */}
                    <div className="d-flex m-2">
                        <InfoCard label='Current Token' value={queueData.arrTokens[0]} color='primary' />
                        <InfoCard label='Next Token' value={queueData.arrTokens[1]} color='secondary' />
                    </div>

                    {/* Token Data */}
                    <div className="d-flex m-2">
                        <InfoCard label='Tokens Processed' value={queueData.tokenProcessed} color='primary' />
                        <InfoCard label='Tokens Issued' value={queueData.tokenIssued} color='secondary' />
                        <InfoCard label='Tokens Remaining' value={queueData.tokenRemaining} color='warning' />
                    </div>

                    <div className="d-flex">
                        {/* Queue Stats */}
                        <div className="">
                            <InfoCard label='Average Waiting Time' value={queueData.averageWaitingTime} color='primary' />
                            <InfoCard label='Max Tokens' value={queueData.maxTokens} color='secondary' />
                            <InfoCard label='Queue Status' value={queueData.status ? "Running" : "Stopped"} color={queueData.status ? "success" : "warning"} />
                        </div>

                        {/* Queue Operations */}
                        <div className="d-flex">
                            <button className='btn btn-primary m-2' onClick={handleStatusChange}>Change Queue Status</button>
                            <button className='btn btn-dark m-2' onClick={handleTokenChange}>Dismiss token after completion and then recalculate avg</button>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )

}

export default Analytics
