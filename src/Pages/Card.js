import React, { useContext } from 'react'
import db from "../firebase";
//import AddQueue from '../Components/AddQueue'
//import Navbar from '../Components/Navbar'
import usercontext from '../Context/usercontext';
import Card from '@mui/material/Card';
import { doc, onSnapshot, query,collection, getDocs, where } from "firebase/firestore";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import bgs from '../static/cardbg.js';
import {Grid} from '@material-ui/core';
function col(){
    return bgs[Math.floor(Math.random() * 5)]
}

function Cardfunc() {
    const arr = [];
    const [queueData, setqueueData] = React.useState({
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
    const context = useContext(usercontext)
    const { user } = context;
    const uid = user.uid;
    console.log("hi");


  React.useEffect(() => {
    async function getData() {
        //const q = query(collection(db, "queue"), where("admin_id", "==", uid));
        //console.log(q);
        var query = collection(db, "queue")
        const querySnapshot = await getDocs(query);
        // console.log(querySnapshot);
        querySnapshot.docs.map((doc) => {
            console.log(doc.data());
            // setqueueData(queueData => [...queueData, ])
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
            arr.push(doc.data());
        });
    //   const unsub = onSnapshot(
    //     doc(db, "admin", "l3jep9KQkHRVGLdjgQplZINctS42"),
    //     { includeMetadataChanges: true },
    //     (doc) => {
    //         console.log(doc.data());
            
    //     });
      }
  getData();
}, []);
//  var st=col()
    return (
        <>
        <div style={{padding:"10px"  }} >
        <Card sx={{ maxWidth: 200, padding:"10px" }}>
            <CardActionArea style={{flexWrap: 'wrap'}} >
                <CardMedia
                component="img"
                height="140"
                width="150"
                image={col()}
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
        </div>
            
        </>
    )
}

export default Cardfunc