import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Box, NavBar } from "@material-ui/core";
import {Navbar, Container, Nav} from 'react-bootstrap'
import {Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate();
    return(
    <Navbar bg="light" data-bs-theme="light">
        <Container>
        <Navbar.Brand onClick={()=>{navigate('/')}}>Start</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/Home/plan')}}>Plan</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/Home/map')}}>Maps</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/Home/setting')}}>Setting</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    );
}

export default NavBar

//https://goo-gy.github.io/2021-02-28-material-ui