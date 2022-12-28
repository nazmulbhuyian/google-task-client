import { Button, Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {

        return <Button>
            <Spinner aria-label="Spinner button example" />
            <span className="pl-3">
                Loading...
            </span>
        </Button>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;