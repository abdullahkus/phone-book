import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { UserContext } from '../../contexts/user.context';
import { useNavigate } from 'react-router-dom';

import * as authServices from '../../services/auth.service';
import { setLocalStorage } from '../../utils/local-storage.utils';

const Login = () => {
    const navigate = useNavigate();
    const { setJwtToken } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const response = await authServices
            .login(data)
            .then((response) => response.data);

        setLocalStorage('access-token', response.token);
        setJwtToken(response.token);

        navigate('/');
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: '350px',
                            gap: 2,
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h4">Login</Typography>
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            {...register('email', {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            })}
                            error={!!errors?.email}
                            helperText={
                                (errors?.email?.type === 'required' &&
                                    'Email is required') ||
                                (errors?.email?.type === 'pattern' &&
                                    'Invalid email format')
                            }
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            {...register('password', {
                                required: true,
                            })}
                            error={!!errors?.password}
                            helperText={
                                errors?.password?.type === 'required' &&
                                'Password is required'
                            }
                        />
                        <Button
                            sx={{ display: 'block' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                        <Button
                            sx={{ display: 'block' }}
                            type="submit"
                            variant="text"
                            color="success"
                            onClick={() => navigate('/auth/register')}
                        >
                            Don't have an account?
                            <br /> Sign Up
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default Login;
