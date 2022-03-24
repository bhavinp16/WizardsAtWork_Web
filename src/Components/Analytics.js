import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import db from '../firebase';
import InfoCard2 from './InfoCard2';
import PieChart from './PieChart';
import Navbar from './Navbar';

import { useToasts } from 'react-toast-notifications';
import NProgress from 'nprogress';
import '../Pages/nprogress.css';

// route /queue/:qid
function Analytics() {

    // Specific to Queue
    const { addToast } = useToasts();

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
        prevTokenTimestamp: 0,
    });

    // update the states with the data from the database by doing async functions for the same 
    useEffect(() => {
        async function getData() {
            NProgress.start();
            // write firebase query here to fetch data for that queue;
            const unsub = onSnapshot(
                doc(db, "queue", qid),
                { includeMetadataChanges: true },
                (doc) => {
                    console.log(doc.data());
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
                    NProgress.done();
                });
        }
        getData();
    }, [qid]);

    const handleStatusChange = (e) => {
        e.preventDefault();
        NProgress.start();
        // write firebase query here to update the status of the queue
        const queueRef = doc(db, 'queue', qid);
        setDoc(queueRef, { status: !queueData.status }, { merge: true });
        addToast("Queue Status Changed Successfully", { appearance: 'success', autoDismiss: true, autoDismissTimeout: 1500 });
        NProgress.done();
    }

    const handleTokenChange = (e) => {
        e.preventDefault();
        NProgress.start();
        if (queueData.tokenIssued >= queueData.maxTokens) {
            addToast("Maximum Token Alloted Status Reached", { appearance: 'error', autoDismiss: true, autoDismissTimeout: 1500 });
            return;
        }

        // calculate the token's current time
        // update the waiting time
        // remove first token from the arr_tokens
        // increment tokens distributed

        const currTimestamp = Date.now() / 1000 | 0;
        const prevTimestamp = queueData.prevTokenTimestamp;

        const res = Math.abs(currTimestamp - prevTimestamp) / 1000;

        const currentTokenTime = Math.floor(res); // in mins

        const queueRef = doc(db, 'queue', qid);
        setDoc(queueRef, {
            Avg_wait_time: Math.floor(((queueData.averageWaitingTime * queueData.tokenProcessed) + currentTokenTime) / (queueData.tokenProcessed + 1)),
            arr_tokens: queueData.arrTokens.slice(1),
            token_distributed: queueData.tokenIssued + 1,
            prev_timestamp: currTimestamp,
        }, { merge: true });
        addToast("Token Processed Successfully", { appearance: 'success', autoDismiss: true, autoDismissTimeout: 1500 });

        NProgress.done();
    }


    return (
        <>
            <Navbar />
            <div className='d-flex flex-column justify-content-center align-content-center border border-grey m-4 shadow p-4'>

                <div className="d-flex justify-items-center align-content-center">
                    <div className="d-flex container justify-content-center align-content-center">
                        <div class="jumbotron jumbotron-fluid shadow mr-5 px-4 rounded-3">
                            <div class="container-fluid">
                                <h3 class="display-3 pl-5 pr-3">Queue Details</h3>
                                <p class="lead">Category: {queueData.queueDetails.category}</p>
                                <p class="lead">Name: {queueData.queueDetails.name}</p>
                            </div>
                        </div>

                        {/* Current Token Status */}
                        <div className="d-flex mx-5 my-2 px-4 py-2">
                            <InfoCard2 label='Current Token' value={queueData.arrTokens[0]} color='primary' />
                            <InfoCard2 label='Next Token' value={queueData.arrTokens[1]} color='secondary' />
                        </div>
                    </div>
                </div>


                <div className='d-flex justify-content-center align-content-center'>
                    <div className="d-flex container justify-content-center align-content-center">

                        <div className="d-flex flex-column ">
                            {
                                queueData.tokenIssued > 0 ?
                                    <PieChart tokenWaiting={queueData?.arrTokens?.length} tokenProcessed={queueData?.tokenProcessed} tokenRemaining={queueData?.tokenRemaining} />
                                    :
                                    <>No Tokens Issued</>
                            }

                            <div className="d-flex justify-content-center align-content-center mt-2 ">
                                <button className='btn btn-primary m-2 shadow' onClick={handleStatusChange}>Change Queue Status</button>
                                <button className='btn btn-dark m-2 shadow' onClick={handleTokenChange}>Dismiss Token</button>
                            </div>
                        </div>

                        {/* Token Data */}
                        <div className="d-flex flex-column m-3">
                            <InfoCard2 label='Tokens Processed' value={queueData.tokenProcessed} color='secondary' />
                            <InfoCard2 label='Tokens Issued' value={queueData.tokenIssued} color='info' />
                            <InfoCard2 label='Tokens Remaining' value={queueData.tokenRemaining} color='danger' />
                        </div>

                        <div className="d-flex flex-column m-3">
                            {/* Queue Stats */}
                            <div className="">
                                <InfoCard2 label='Average Waiting Time' value={queueData.averageWaitingTime} color='info' />
                                <InfoCard2 label='Max Tokens' value={queueData.maxTokens} color='secondary' />
                                <InfoCard2 label='Queue Status' value={queueData.status ? "Running" : "Stopped"} color={queueData.status ? "success" : "warning"} />
                            </div>
                        </div>
                    </div>
                </div>


            </div >
        </>
    )

}

export default Analytics
