import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import * as authServices from '../../services/auth.service';
const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        await authServices.register(data).then(() => {
            navigate('/auth/login');
        });
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
                        <Typography variant="h4">Register</Typography>
                        <TextField
                            name="firstname"
                            label="First Name"
                            type="text"
                            variant="outlined"
                            {...register('firstname', {
                                required: true,
                                minLength: 2,
                            })}
                            error={!!errors?.firstname}
                            helperText={
                                (errors?.firstname?.type === 'required' &&
                                    'First name is required') ||
                                (errors?.firstname?.type === 'minLength' &&
                                    'First name must be at least 2 characters')
                            }
                        />
                        <TextField
                            name="lastname"
                            label="Last Name"
                            type="text"
                            variant="outlined"
                            {...register('lastname', {
                                required: true,
                                minLength: 2,
                            })}
                            error={!!errors?.lastname}
                            helperText={
                                (errors?.lastname?.type === 'required' &&
                                    'Last name is required') ||
                                (errors?.lastname?.type === 'minLength' &&
                                    'Last name must be at least 2 characters')
                            }
                        />
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
                                minLength: 8,
                            })}
                            error={!!errors?.password}
                            helperText={
                                (errors?.password?.type === 'required' &&
                                    'Password is required') ||
                                (errors?.password?.type === 'minLength' &&
                                    'Password must be at least 8 characters')
                            }
                        />
                        <Button
                            sx={{ display: 'block' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Register
                        </Button>
                        <Button
                            sx={{ display: 'block' }}
                            type="submit"
                            variant="text"
                            color="success"
                            onClick={() => navigate('/auth/login')}
                        >
                            Do you have an account?
                            <br /> Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default Register;
