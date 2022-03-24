import React from "react";
import db from "../firebase";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { useParams } from 'react-router-dom';
//import { AdminInput } from "./AdminInput";
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Modal from './Modal';
import {
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function AddQueue() {
//const [newQueueName, setNewQueueName] = React.useState();


  React.useEffect(() => {
    async function getData() {
      const unsub = onSnapshot(
        doc(db, "queue", "JGwfAKFauQ2S9ii1r09G"),
        { includeMetadataChanges: true },
        (doc) => {
          //console.log(doc.data());
        });
    }
    getData();
  }, []);

  // const onCreate = () => {
  //     //const db = firebase.firestore();
  //     db.collection("queue").add({ name: newQueueName });
  // };

  // const [newQueue, setNewQueue] = useState("");
  // //const [newAge, setNewAge] = useState(0);

  // const [queues, setQueues] = useState({});
  // const QueuesCollectionRef = collection(db, "queue");

  // const createQueue = async () => {
  //   await addDoc(QueuesCollectionRef, { Queue: newQueue });
  // };

  // const updateQueue = async (id, age) => {
  //   const QueueDoc = doc(db, "Queues", id);
  //   const newFields = { age: age + 1 };
  //   await updateDoc(QueueDoc, newFields);
  // };

  // const deleteQueue = async (id) => {
  //   const QueueDoc = doc(db, "Queues", id);
  //   await deleteDoc(QueueDoc);
  // };

  // useEffect(() => {
  //   const getQueues = async () => {
  //     const data = await getDocs(QueuesCollectionRef);
  //     setQueues(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     console.log(queues);
  //     console.log(data);
  //   };

  //   getQueues();
  // }, []);

  return (
    <div className="m-4">
      {/* <input
        value={newQueue}
        onChange={e => setNewQueue(e.target.value)}
      /> */}
      {/* <button onClick={onCreate}>Create</button> */}
      {/* <IconButton
        //onClick={createQueue}
        size="large"
        edge="start"
        color="inherit"
        aria-label="add"
        sx={{ mr: 2 }}
      >
        <AddBoxIcon />
      </IconButton> */}
      <Modal />
      {/* {queue.map(q => (
                <li key={q.Queue}>
                    <AdminInput q={q} />
                </li>
            ))} */}
    </div>
  );
}