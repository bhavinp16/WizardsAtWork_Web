import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import db from "../firebase"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [category, setcategory] = React.useState({
    max_token: 0,
    queue_details: {
      category: "",
      name: ""
    },
    status: true,
  });

  const handleChange1 = (event) => {
    event.preventDefault();
    setcategory(event.target.value);
  };


  const handleChange2 = (event) => {
    event.preventDefault();
    setcategory(event.target.value);
  };

  
  const handleChange3 = (event) => {
    event.preventDefault();
    setcategory(event.target.value);
  };

  const handleChange4 = (event) => {
    event.preventDefault();
    setcategory(event.target.value);
  };



  var obj1={  //.push automatically makes id
    max_token:queue.max_token,
    queue_details: {
        category: queue.category,
        name: queue.name
                },
    status:queue.status
  };

  const handleSubmit = (event) => {
      var obj1={  //.push automatically makes id
        max_token:queue.max_token,
        queue_details: {
            category: queue.category,
            name: queue.name
                    },
        status:queue.status
      };
  console.log(queue);
    //setcategory(event.target.value);
    event.preventDefault();
    const docRef =db.ref("queue");
    const newDocRef=docRef.push();
    newDocRef.set(obj1);
  };

  const addItem = name => {
    db.collection('queue').add({ name });
  };
  return (
    <div>
        <IconButton
        onClick={handleOpen}
        size="large"
        edge="start"
        color="inherit"
        aria-label="add"
        sx={{ mr: 2 ,height: '100px', width : '100px'}}
        
      >
        <AddBoxIcon sx={{height: '100px', width : '100px', borderRadius: '50%', color:'#2196f3'}}/>
      </IconButton>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box 
        component="form"
        sx={style}
      noValidate
      autoComplete="off"
    >
        <div>
        <h3>Fill Queue details</h3>
      <TextField id="standard-basic" label="Name" variant="standard" padding="2px"/>
      {/* <TextField id="standard-basic" label="Category" variant="standard" padding="2px"/> */}
      
      <div>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="category"
          onChange={handleChange}
        >
          <MenuItem value={'doctor'}>Doctor</MenuItem>
          <MenuItem value={'shop'}>Shop</MenuItem>
          <MenuItem value={'bus_stop'}>Bus Stop</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
      </div>

      <TextField id="standard-basic" label="Max Token" variant="standard" padding="2px"/>
      {/* <TextField id="standard-basic" label="Queue Status" variant="standard" padding="2px"/> */}

      <FormControlLabel control={<Switch defaultChecked />} label="Running Queue" />
        </div>
        <div style={{padding:'10px'}}>
        <Button onClick={handleSubmit}>Submit</Button>
        </div>
       
    </Box>
      </Modal>
    </div>
  );
}