import React from 'react';
import useAuth from '../Hooks/useAuth';
import { PuffLoader } from 'react-spinners';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <PuffLoader size={24} />
    }

    if (!user) {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }

    return children
};

export default PrivateRoute;