// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Box, AppBar, Toolbar, Typography, InputBase, makeStyles} from "@material-ui/core";
// import AirplaneticketIcon from '@mui/icons-material/AirplaneTicket';
// // import {Navbar, Container, Nav} from 'react-bootstrap'
// import {Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

// const useStyles = makeStyles({
//     title: {
//         color: 'white',
//     },

// })

// const MyNavBar = () => {
//     const navigate = useNavigate();
//     const classes = useStyles();

//     return(

//         <AppBar position="static">
//             <Toolbar>
//                 <Container>
//                     <AirplaneticketIcon/>
//                 <Typography className={classes.title}> trip designer</Typography>
//                 </Container>
//                 <Box display="flex">
//                         <Typography>Plan</Typography>
//                         <Typography>Map</Typography>
//                         <Typography>Setting</Typography>
//                 </Box>
//             </Toolbar>
//         </AppBar>

//     // <Appbar position="static">
//     //     <Container>
//     //     <Navbar.Brand onClick={()=>{navigate('/')}}>Start</Navbar.Brand>
//     //     <Nav className="me-auto">
//     //         <Nav.Link onClick={()=>{navigate('/Home/plan')}}>Plan</Nav.Link>
//     //         <Nav.Link onClick={()=>{navigate('/Home/map')}}>Maps</Nav.Link>
//     //         <Nav.Link onClick={()=>{navigate('/Home/setting')}}>Setting</Nav.Link>
//     //     </Nav>
//     //     </Container>
//     // </Appbar>
//     );
// }

// export default MyNavBar

//TODO: add onClick={()=>{navigate('/')}}

import * as React from 'react';
import {AppBar, Box, Toolbar, Typography,Tooltip,
    IconButton, Menu, Container, Avatar,
    MenuItem, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

const pages = ['Plan', 'Map', 'Setting'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pagesURL = ['/home/plan','/home/map','/home/setting']

export default function MyNavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="/"
            onClick={()=>{navigate('/')}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page,n) => (
                <MenuItem key={page}  onClick={()=>{navigate(pagesURL[n])}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            // href="/"
            onClick={()=>{navigate('/')}}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,n) => (
              <Button
                key={page}
                onClick={()=>{navigate(pagesURL[n])}}
                sx={{ my: 2, color: 'white', display: 'block' }}
                
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
