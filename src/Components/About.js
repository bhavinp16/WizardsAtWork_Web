// import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Link, Navigate } from 'react-router-dom';
// import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
// import SortIcon from '@material-ui/icons/Sort';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// // import { Link as Scroll } from 'react-scroll';
// import Login from '../Pages/Login';
// import Navbar from './Navbar'
// const useStyles = makeStyles((theme) => ({
//   root: {
//     // display: 'flex',
//     // justifyContent: 'left',
//     // alignItems: 'center',
//     display:'flex',
//     // flex-direction:'row',
//     height: '100vh',
//     fontFamily: 'Nunito',
//   },
//   appbar: {
//     background: 'none',
//   },
//   appbarWrapper: {
//     width: '80%',
//     margin: '0 auto',
//   },
//   appbarTitle: {
//     flexGrow: '1',
//   },
//   icon: {
//     color: '#fff',
//     fontSize: '2rem',
//   },
//   colorText: {
//     color: 'ivory',
//   },
//   container: {
//     textAlign: 'top',
//     alignItems: 'center',
//     justifyContent: 'left',
//   },
//   title: {
//     color: '#2196f3',
//     fontSize: '4.5rem',
//   },
//   goDown: {
//     color: '#1769aa',
//     fontSize: '4.5rem',
//   },
// }));
// export default function About() {
//   const classes = useStyles();
//   const [checked, setChecked] = useState(false);
//   useEffect(() => {
//     setChecked(true);
//   }, []);
//   return (
//       <div id="About">
//           <div className={classes.root} >
//       <AppBar className={classes.appbar} elevation={0}>
//         <Navbar/>
//       </AppBar>
//       {/* <Collapse
//         in={checked}
//         {...(checked ? { timeout: 1000 } : {})}
//         collapsedHeight={50}
//       > */}
//         <div className={classes.container}>
//             <div>
//             <h1 className={classes.title}>
//             <span className={classes.colorText} style={{textAlign:'top'}}>About</span>
//           </h1>
//             </div>
//           <div>
//               <h3>something something</h3>
//           </div>
//         </div>

       
//       {/* </Collapse> */}
//     </div>
//     {/* <div style={{alignItems: 'center', justifyContent: 'right'}}>
//         <h1>ok</h1>
//         </div> */}
//       </div>
    
//   );
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import places from '../static/places';
import useWindowPosition from '../hook/useWindowPosition';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
      <div>
          <div style={{fontFamily: 'Nunito', color:'ivory', padding:'10px'}}>
              <h1 style={{marginTop:'10px',}}>Key Features</h1>
          </div>
          <div className={classes.root} id="place-to-visit">
        <ImageCard place={places[0]} checked={checked} />
        <ImageCard place={places[1]} checked={checked} />
        <ImageCard place={places[2]} checked={checked} />

    </div>

      </div>
    
  );
}