import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Navigate } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import { Link as Scroll } from 'react-scroll';
import Login from '../Pages/Login';
import Navbar from './Navbar'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  colorText: {
    color: '#black',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#black',
    fontSize: '4.5rem',
  },
  goSign: {
    color: '#1769aa',
    fontSize: '4.5rem',
  },
}));

export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (

    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Navbar />
      </AppBar>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className="">
          <div className={classes.container}>
            <h1 className={classes.title}>
              Welcome to <br />
              <span className={classes.colorText}>Smart Queue Management</span>
            </h1>

            {/* <Scroll to={Login} smooth={true}> */}
            <div style={{ fontFamily: 'Arial', textColor: 'black' }}>
              <IconButton component={Link} to="/signup">
                Get Started<ArrowForwardIcon className={classes.goSign} />
              </IconButton>
            </div>
            {/* </Scroll> */}
          </div>
        </div>
      </Collapse>
    </div>
  );
}