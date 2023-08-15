import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
// import {useParams} from 'react-router-dom'
import './App.css';
import GMap from './googlemap.js';
import {useState, useEffect} from 'react';
import {Wrapper, Status} from "@googlemaps/react-wrapper"; //google map

function App() {
  
  return (
    <>
    <Navbar bg="light" data-bs-theme="light">
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Plan</Nav.Link>
        <Nav.Link href="#features">Maps</Nav.Link>
        <Nav.Link href="#pricing">Setting</Nav.Link>
      </Nav>
    </Container>
    </Navbar>
    
  {/* <Router>
    <Routes>
      <Route></Route>
      <Route></Route>
      <Route></Route>
    </Routes>
  </Router> */}

    

</>

  );
  
function Card(prop){
  return(
    <>
    <Container>
      <h2>Day N</h2>
      <div>
        <h3>Place</h3>
        <p>Specific location</p>
        <img/>
      </div>
      <Button>BTN</Button>
    </Container>
    </>
  )
}


}


export default App;
