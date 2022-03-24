import React, { useEffect, useState, useContext } from 'react';
import usercontext from '../Context/usercontext';
import db from "../firebase";
import { doc, getDoc, collection, query, where } from "firebase/firestore";
import Infocard from '../Components/InfoCard';
import { Button } from '@material-ui/core';
function CreateQueueQ(queue) { //input param is queue obj w name max_token (cat status)

    // const context = useContext(usercontext)
    // const { user } = context;
    // const adminId = user.uid;

    // const [queueIds, setQueueIds] = useState([]);
    // const [queueDetails, setqueueDetails] = useState({});

    // function to get the list of queues started by the signedIn admin user
    const createQueue = async () => {
        const docRef = doc(db, "queue");
        const docSnap = await getDoc(docRef);
        console.log(queue);
        // if (docSnap.exists()) {
        //     setQueueIds(docSnap.data().queue_arr);
        //     console.log("queues:", queueIds);
        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        // }
        docRef.push().set({  //.push automatically makes id
            max_token:queue.max_token,
            queue_details: {
                category: queue.category,
                name: queue.name
                        },
            status:queue.status
          });
    }

    // useEffect(() => {
    //     createQueue();
    // }, []);

    // useEffect(() => {
    //     const getQueueDetails = async () => {
    //         const queueDetails = {
    //             category: queue.category,
    //             name: queue.name
    //         };
    //         setqueueDetails(queueDetails);
    //     }
    //     getQueueDetails();
    //     console.log("queueDetails:", queueDetails);
    // }, [queueIds]);

    // const color = {
    //     0: "primary",
    //     1: "secondary",
    //     2: "success",
    //     3: "warning",
    //     4: "info",
    // }

    return (
        <>
        <Button onClick={createQueue}>
            Click to Add
        </Button>
        </>
    )
}

export default CreateQueueQ