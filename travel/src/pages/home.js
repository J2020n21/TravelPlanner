import React from 'react';
import NavBar from '../components/navbar';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <>
        <NavBar/>
        <Outlet></Outlet>
    </>
  )
}
