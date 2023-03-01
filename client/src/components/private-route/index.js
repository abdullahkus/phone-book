import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';

const PrivateRoute = ({ component: Component }) => {
    const { currentUser } = useContext(UserContext);

    return <>{currentUser && !currentUser.disabled ? <Component /> : <Navigate to="/auth/login" />}</>;
};

export default PrivateRoute;
