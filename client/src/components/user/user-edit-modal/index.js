import React, { useEffect, useContext } from 'react';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import * as userService from '../../../services/user.service';
import { UserContext } from '../../../contexts/user.context';

const UserEditModal = ({ open, handleClose, setUsers, selectedUser }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const { setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        reset(selectedUser);
    }, [reset, selectedUser]);

    const onSubmit = async (data) => {
        console.log(data);
        console.log(selectedUser);
        const response = await userService
            .update(selectedUser.id, data)
            .then((response) => response.data);

        setCurrentUser(response);

        setUsers((currentUser) => {
            const updatedUsers = currentUser.map((user) =>
                user.id === selectedUser.id ? response : user,
            );
            return updatedUsers;
        });

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
                    Edit Number
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
                            defaultValue={selectedUser?.firstname || ''}
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
                            defaultValue={selectedUser?.lastname || ''}
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
                            defaultValue={selectedUser?.email || ''}
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
                            label="Password"
                            type="text"
                            variant="outlined"
                            {...register('password', {
                                minLength: 8,
                            })}
                            error={!!errors?.phoneNumber}
                            helperText={
                                errors?.password?.type === 'minLength' &&
                                'Password must be at least 8 characters'
                            }
                        />
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                name="role"
                                defaultValue={selectedUser?.role || ''}
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
                        <FormControlLabel
                            control={
                                <Switch
                                    {...register('enabled')}
                                    defaultChecked={selectedUser.enabled}
                                />
                            }
                            label="Enabled"
                        />
                        <Button
                            sx={{ display: 'block' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Modal>
    );
};

export default UserEditModal;
