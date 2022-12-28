import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Main = () => {
    return (
        <div className='dark:bg-gray-900 dark:text-white min-h-screen'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;