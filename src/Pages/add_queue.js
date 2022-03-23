import React from "react";
import db from "../firebase";
import { AdminInput } from "./admin_q_input";

export default function AddQueue() {
    const [queue, setQueue] = React.useState([]);
    const [newQueueName, setNewQueueName] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
        //const db = firebase.firestore();
        const data = await db.collection("queue").get();
        setQueue(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    const onCreate = () => {
        //const db = firebase.firestore();
        db.collection("queue").add({ name: newQueueName });
    };

    return (
        <ul>
        <input
            value={newQueueName}
            onChange={e => setNewQueueName(e.target.value)}
        />
        <button onClick={onCreate}>Create</button>
        {queue.map(q => (
            <li key={q.name}>
            <AdminInput q={q} />
            </li>
        ))}
        </ul>
    );
}