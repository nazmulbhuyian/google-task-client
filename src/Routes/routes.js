import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Login from '../Login/Login';
import Register from '../Login/Register';
import AddTask from '../Pages/AddTask/AddTask';
import CompletedTask from '../Pages/CompletedTask/CompletedTask';
import MyTask from '../Pages/MyTask/MyTask';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/',
                element: <AddTask></AddTask>
            },
            {
                path: '/myTask',
                element: <PrivateRoute><MyTask></MyTask></PrivateRoute>
            },
            {
                path: '/completedTask',
                element: <PrivateRoute><CompletedTask></CompletedTask></PrivateRoute>
            }
        ]
    }
])


export default router;