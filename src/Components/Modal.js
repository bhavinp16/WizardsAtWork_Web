import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
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
import usercontext from '../Context/usercontext';
import { collection, getDoc, addDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import db from '../firebase';
import NProgress from 'nprogress';
import { AddToast, useToasts } from 'react-toast-notifications';

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

  const context = useContext(usercontext)
  const { addToast } = useToasts();

  const [Queuearr, setQueuearr] = useState(null);

  const { user } = context;
  const AdminId = user.uid;

  // formdata state
  const [formdata, setFormdata] = useState({
    Avg_wait_time: 0,
    arr_tokens: [],
    max_tokens: 0,
    category: "",
    name: "",
    status: true,
    token_distributed: 0,
  });

  // handleformdatachange function
  const handleformdatachange = (e) => {
    e.preventDefault();
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };



  const [queueIds, setQueueIds] = useState([]);

  // function to get the list of queues started by the signedIn admin user
  const getQueueList = async () => {
    const docRef = doc(db, "admin", `${AdminId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setQueueIds(docSnap.data().queue_arr);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getQueueList();
  }, []);

  // onsubmit function
  // ~> add state data to create new instance of queue doc in queue collection
  // ~> add created queue instance id in admin collections -> adminId docs -> queues array
  const onsubmit = async (e) => {
    e.preventDefault();
    NProgress.start();
    // Add a new document with a generated id.

    const docRef = await addDoc(collection(db, "queue"), {
      Avg_wait_time: formdata.Avg_wait_time,
      arr_tokens: formdata.arr_tokens,
      max_tokens: formdata.max_tokens,
      queue_details: {
        category: formdata.category,
        name: formdata.name,
      },
      status: formdata.status,
      token_distributed: formdata.token_distributed,
    });

    console.log("Document written with ID: ", docRef.id);

    // const unsub = onSnapshot(
    //   doc(db, "admin", AdminId),
    //   { includeMetadataChanges: true },
    //   (docx) => {
    //     const queueArr = docx.data().queue_arr;
    //     queueArr.push(docRef.id);
    //     console.log(queueArr);
    //     const adminRef = doc(db, 'admin', AdminId);
    //     setDoc(adminRef, { queueR_arr: queueArr }, { merge: true });
    //   })
    // unsub();

    const adminRef = doc(db, 'admin', AdminId);
    setQueueIds([...queueIds, docRef.id]);
    console.log(queueIds);
    setDoc(adminRef, { queueR_arr: queueIds }, { merge: true });

    NProgress.done();
    addToast("Queue Created Successfully", { appearance: 'success', autoDismiss: true });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton
        onClick={handleOpen}
        size="large"
        edge="start"
        color="inherit"
        aria-label="add"
        sx={{ mr: 2, height: '100px', width: '100px' }}

      >
        <AddBoxIcon sx={{ height: '100px', width: '100px', borderRadius: '50%', color: '#2196f3' }} />
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
            <TextField type='text' id="standard-basic" label="Name" onChange={handleformdatachange} name='name' variant="standard" padding="2px" />
            {/* <TextField id="standard-basic" label="Category" variant="standard" padding="2px"/> */}

            <div>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formdata.category}
                label="category"
                name='category'
                onChange={handleformdatachange}
              >
                <MenuItem value={'Doctor'}>Doctor</MenuItem>
                <MenuItem value={'Shop'}>Shop</MenuItem>
                <MenuItem value={'Bus Stop'}>Bus Stop</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
              </Select>
            </div>

            <TextField id="standard-basic" value={formdata.max_tokens} name="max_tokens" onChange={handleformdatachange} label="Max Token" variant="standard" padding="2px" />
            {/* <TextField id="standard-basic" label="Queue Status" variant="standard" padding="2px"/> */}

            <FormControlLabel name="status" onChange={(e) => {
              e.preventDefault();
              if (e.target.checked) {
                setFormdata({
                  ...formdata,
                  status: true,
                })
              } else {
                setFormdata({
                  ...formdata,
                  status: false,
                })
              }
            }} control={<Switch defaultChecked />} label="Running Queue" />
          </div>
          <div style={{ padding: '10px' }}>
            <Button onClick={onsubmit}>Submit</Button>
          </div>

        </Box>
      </Modal>
    </div>
  );
}
