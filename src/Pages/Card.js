import React from 'react'
import db from "../firebase";
//import AddQueue from '../Components/AddQueue'
//import Navbar from '../Components/Navbar'
import Card from '@mui/material/Card';
import { doc, onSnapshot, query,collection, getDocs } from "firebase/firestore";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Cardfunc() {
    const [queueData, setqueueData] = React.useState({
        averageWaitingTime: 0, // in minutes
        arrTokens: [],
        maxTokens: 0,
        queueDetails: {},
        status: true,
        tokenProcessed: 0,
        tokenIssued: 0,
        tokenRemaining: 0,
    });

  React.useEffect(() => {
    async function getData() {
        // const q = query(collection(db, "admin", "l3jep9KQkHRVGLdjgQplZINctS42"));
        // doc(q);
        // //querySnapshot.forEach((doc) => {
        // // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data());
        // });
      const unsub = onSnapshot(
        doc(db, "admin", "l3jep9KQkHRVGLdjgQplZINctS42"),
        { includeMetadataChanges: true },
        (doc) => {
            console.log(doc.data());
            // setqueueData({
            //     ...queueData,
            //     averageWaitingTime: doc.data().Avg_wait_time,
            //     arrTokens: doc.data().arr_tokens,
            //     maxTokens: doc.data().max_tokens,
            //     queueDetails: doc.data().queue_details,
            //     status: doc.data().status,
            //     tokenProcessed: doc.data().token_distributed - doc.data().arr_tokens.length,
            //     tokenIssued: doc.data().token_distributed,
            //     tokenRemaining: doc.data().max_tokens - doc.data().token_distributed,
            // });
        });
      }
  getData();
}, []);
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                //image="add_queue.jpg"
                //alt="Create a Queue"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {queueData.queueDetails.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {queueData.queueDetails.name}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        </>
    )
}

export default Cardfunc