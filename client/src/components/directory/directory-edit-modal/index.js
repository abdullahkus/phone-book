import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import * as directoryService from '../../../services/directory.service';

const DirectoryEditModal = ({
    open,
    handleClose,
    setDirectories,
    selectedDirectory,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        reset(selectedDirectory);
    }, [reset, selectedDirectory]);

    const onSubmit = async (data) => {
        const response = await directoryService
            .update(selectedDirectory.id, data)
            .then((response) => response.data);
        setDirectories((currentDirectories) => {
            const updatedDirectories = currentDirectories.map((directory) =>
                directory.id === selectedDirectory.id ? response : directory,
            );
            return updatedDirectories;
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
                            defaultValue={selectedDirectory?.firstname || ''}
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
                            defaultValue={selectedDirectory?.lastname || ''}
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
                            name="phoneNumber"
                            label="Phone Number"
                            type="tel"
                            variant="outlined"
                            defaultValue={selectedDirectory?.phoneNumber || ''}
                            {...register('phoneNumber', {
                                required: true,
                                pattern: /^[0-9]{10}$/,
                            })}
                            error={!!errors?.phoneNumber}
                            helperText={
                                (errors?.phoneNumber?.type === 'required' &&
                                    'Phone number is required') ||
                                (errors?.phoneNumber?.type === 'pattern' &&
                                    'Phone number must be 10 digits')
                            }
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

export default DirectoryEditModal;
