import * as React from 'react';
import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import usercontext from '../Context/usercontext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function ButtonAppBar() {

  const context = useContext(usercontext)
  const { user, setuser } = context

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='bg-dark'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <div className="d-flex justify-content-between align-content-between">
            <div className='d-flex'>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link className='btn text-light' to="/home">Home</Link>
              </Typography>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link className='btn text-light' to="/dashboard">Dashboard</Link>
              </Typography>
            </div>



            {
              !user ?
                (
                  <Button component={Link} to="/login" color="inherit">
                    Login
                  </Button>
                ) :
                (
                  <Button onClick={() => {
                    signOut(auth).then(() => {
                      setuser(null);
                      <Navigate to="/login" />
                      // Sign-out successful.
                    }).catch((error) => {
                      // An error happened.
                      console.log(error);
                    });
                  }} color="inherit" >
                    Logout
                  </Button>
                )
            }
          </div>

        </Toolbar>
      </AppBar>
    </Box >
  );
}