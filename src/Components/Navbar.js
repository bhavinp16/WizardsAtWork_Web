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

export default function ButtonAppBar() {

  const context = useContext(usercontext)
  const { user, setuser } = context

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
          {/* <Button color="inherit" onClick={() => { console.log('onClick'); window.location.replace("http://stackoverflow.com"); }}>Login!</Button> */}

          {
            !user ?
              (
                <Button component={Link} to="/login" color="inherit">
                  LOGIN
                </Button>
              ) :
              (
                <Button onClick={() => { 
                  auth.signOut();
                  setuser(null);
                  <Navigate to="/login" />
                }} color="inherit" >
                  LOGOUT
                </Button>
              )
          }


        </Toolbar>
      </AppBar>
    </Box >
  );
}