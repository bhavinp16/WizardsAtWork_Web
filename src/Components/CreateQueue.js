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
    console.log(queue);
        var obj1={  //.push automatically makes id
                max_token:queue.max_token,
                queue_details: {
                    category: queue.category,
                    name: queue.name
                            },
                status:queue.status
              };
        console.log(queue);
    
    const createQueue = async () => {
        const docRef =db.ref("queue");
        const newDocRef=docRef.push();
        newDocRef.set(obj1);
        ////
        // const docref = doc(collection(db, 'udstyr'));
        // const colref = collection(docref, 'subcollection');
        // const docSnap = await getDoc(docRef);
        // console.log("ds",docRef);
        

            // db.ref("queue").set({obj1}).catch(alert);
          
        // docRef.push().set({  //.push automatically makes id
        //     max_token:queue.max_token,
        //     queue_details: {
        //         category: queue.category,
        //         name: queue.name
        //                 },
        //     status:queue.status
        //   });
        // db.ref('queue').push().set(obj1)
    }
    // const postId = newPostRef.key;



    return (
        <>
        <Button onClick={createQueue}>
            Click to Add
        </Button>
        </>
    )
}

export default CreateQueueQ