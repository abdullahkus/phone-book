import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';

const PrivateAdminRoute = ({ component: Component }) => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            {currentUser && !currentUser.disabled &&currentUser?.role === 'ROLE_ADMIN' ? (
                <Component />
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};

export default PrivateAdminRoute;
