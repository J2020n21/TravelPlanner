import React from 'react';
import MyNavBar from '../components/navbar';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <>
        <MyNavBar/>
        <Outlet></Outlet>
    </>
  )
}
