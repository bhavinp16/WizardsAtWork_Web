import React from "react";
import db from "../firebase";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
//import { AdminInput } from "./AdminInput";
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useState,useEffect } from "react";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  
export default function AddQueue() {
    // const [queue, setQueue] = React.useState([]);
    // const [newQueueName, setNewQueueName] = React.useState();
    

    React.useEffect(() => {
        const fetchData = async () => {
            //const db = firebase.firestore();
            console.log("testtt");
            const data = query(collection(db, "smart-queue-management-s-766c6/organizations"))
            console.log(data);
            setQueue(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    // const onCreate = () => {
    //     //const db = firebase.firestore();
    //     db.collection("queue").add({ name: newQueueName });
    // };
    
    const [newQueue, setNewQueue] = useState("");
    const [newAge, setNewAge] = useState(0);
  
    const [queues, setQueues] = useState({});
    const QueuesCollectionRef = collection(db, "queue");
  
    const createQueue = async () => {
      await addDoc(QueuesCollectionRef, { Queue: newQueue, age: Number(newAge) });
    };
  
    const updateQueue = async (id, age) => {
      const QueueDoc = doc(db, "Queues", id);
      const newFields = { age: age + 1 };
      await updateDoc(QueueDoc, newFields);
    };
  
    const deleteQueue = async (id) => {
      const QueueDoc = doc(db, "Queues", id);
      await deleteDoc(QueueDoc);
    };
  
    useEffect(() => {
      const getQueues = async () => {
        const data = await getDocs(QueuesCollectionRef);
        setQueues(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(queues);
        console.log(data);
      };
  
      getQueues();
    }, []);
  
    return (
        <ul>
            <input
                value={newQueue}
                onChange={e => setNewQueue(e.target.value)}
            />
            {/* <button onClick={onCreate}>Create</button> */}
            <IconButton
            onClick={createQueue}
            size="large"
            edge="start"
            color="inherit"
            aria-label="add"
            sx={{ mr: 2 }}

          >
            <AddBoxIcon />
          </IconButton>
            {/* {queue.map(q => (
                <li key={q.Queue}>
                    <AdminInput q={q} />
                </li>
            ))} */}
        </ul>
    );
}