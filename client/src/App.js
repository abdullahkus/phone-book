import React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();
    return (
        <>
            <Typography onClick={() => navigate('/directories')}>
                Welcome, Here you can list the phone book.
            </Typography>
        </>
    );
};

export default App;
