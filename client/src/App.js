import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/user.context';

const App = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    return (
        <>
            <Typography variant="h4">
                Welcome {`${currentUser.firstname} ${currentUser.lastname}`}
            </Typography>
            <Typography
                variant="body1"
                onClick={() => navigate('/directories')}
            >
                Here you can list the phone book.
            </Typography>
            <Typography variant="body1" onClick={() => navigate('/users')}>
                Here you can list the users. If you are not an admin, you cannot access.
            </Typography>
        </>
    );
};

export default App;
