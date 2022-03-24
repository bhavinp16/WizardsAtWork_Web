import React from 'react'
//import AddQueue from '../Components/AddQueue'
import Navbar from '../Components/Navbar'
import Cardfunc from '../Pages/Card'
import { loadCSS } from 'fg-loadcss';
import Box from '@mui/material/Box';
// import { green } from '@mui/material/colors';
// import Icon from '@mui/material/Icon';
import AddQueue from "../Components/AddQueue"
import Admin from './Admin';

function Dashboard() {

    // React.useEffect(() => {
    //     const node = loadCSS(
    //       'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
    //       // Inject before JSS
    //       document.querySelector('#font-awesome-css') || document.head.firstChild,
    //     );

    //     return () => {
    //       node.parentNode.removeChild(node);
    //     };
    //   }, []);
    // return (
    //     <>
    //         <Navbar />
    //         <div className="App">
    //             <div class="d-flex">
    //                 <Cardfunc />
    //                 <Cardfunc />
    //                 <Cardfunc />
    //                 <Cardfunc />

    //             </div>
    //         </div>
    //         <Box
    //         sx={{
    //             '& > :not(style)': {
    //             m: 2,
    //             },
    //         }}
    //         >
    //         {/* <Icon baseClassName="fas" className="fa-plus-circle" />
    //         <Icon baseClassName="fas" className="fa-plus-circle" color="primary" />
    //         <Icon
    //             baseClassName="fas"
    //             className="fa-plus-circle"
    //             sx={{ color: green[500] }}
    //         />
    //         <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" /> */}
    //        {/* <button>
    //             <Icon baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 30 }} />
    //        </button> */}

    //         </Box>
    //         <AddQueue/>
    //     </>
    // )

    return (
        <Admin />
    )
}

export default Dashboard