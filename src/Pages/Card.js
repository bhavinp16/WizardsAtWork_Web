import React from 'react'
//import AddQueue from '../Components/AddQueue'
//import Navbar from '../Components/Navbar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Cardfunc() {
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
                Create a Queue
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Make your queue so that users can join it.
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        </>
    )
}

export default Cardfunc