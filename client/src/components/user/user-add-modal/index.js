import React from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import * as userService from '../../../services/user.service';

const UserAddModal = ({ open, handleClose, setUsers }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const response = await userService
            .save(data)
            .then((response) => response.data);
        setUsers((currentUsers) => [...currentUsers, response]);
        reset();
        handleClose();
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ marginBottom: 2 }}
                >
                    Add Number
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: '350px',
                            gap: 1,
                            justifyContent: 'center',
                        }}
                    >
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
                                (errors?.firstname?.type === 'required' &&
                                    'Last name is required') ||
                                (errors?.firstname?.type === 'minLength' &&
                                    'Last name must be at least 2 characters')
                            }
                        />
                        <TextField
                            name="email"
                            label="Email"
                            type="text"
                            variant="outlined"
                            {...register('email', {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            })}
                            error={!!errors?.phoneNumber}
                            helperText={
                                (errors?.phoneNumber?.type === 'required' &&
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
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                name="role"
                                defaultValue="ROLE_USER"
                                {...register('role', { required: true })}
                                error={!!errors?.role}
                            >
                                <MenuItem value="ROLE_USER">User</MenuItem>
                                <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                            </Select>
                            {errors?.role && (
                                <FormHelperText>
                                    Role is required
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Button
                            sx={{ display: 'block' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Add
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Modal>
    );
};

export default UserAddModal;
