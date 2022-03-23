import React, { useEffect, useState, useContext } from 'react';
import usercontext from '../Context/usercontext';
import db from "../firebase";
import { doc, getDoc, collection, query, where } from "firebase/firestore";
import Infocard from '../Components/InfoCard';

function Admin() {

    const context = useContext(usercontext)
    const { user } = context;
    const adminId = user.uid;

    const [queueIds, setQueueIds] = useState([]);
    const [queueDetails, setqueueDetails] = useState([]);

    // function to get the list of queues started by the signedIn admin user
    const getQueueList = async () => {
        const docRef = doc(db, "admin", `${adminId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setQueueIds(docSnap.data().queue_arr);
            console.log("queues:", queueIds);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getQueueList();
    }, []);

    useEffect(() => {
        const getQueueDetails = async () => {
            const queueDetails = [];
            for (let i = 0; i < queueIds.length; i++) {
                const docRef = doc(db, "queue", `${queueIds[i]}`);
                const docSnap = await getDoc(docRef);
                queueDetails.push(docSnap.data());
            }
            setqueueDetails(queueDetails);
        }
        getQueueDetails();
        console.log("queueDetails:", queueDetails);
    }, [queueIds]);

    const color = {
        0: "primary",
        1: "secondary",
        2: "success",
        3: "warning",
        4: "info",
    }

    return (
        <>
            <div>Ongoing Queues: </div>
            <div className="d-flex flex-grow-0">
                {
                    queueDetails.map((queue, index) => {
                        return (
                            <div key={index}>
                                <Infocard label={queue?.queue_details?.category} value={queue?.queue_details?.name} color={color[index % 5]} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Admin