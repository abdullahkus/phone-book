import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import * as userService from '../../services/user.service';

import UserAddModal from '../../components/user/user-add-modal';
import UserEditModal from '../../components/user/user-edit-modal';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const handleAddModalOpen = () => setOpenAddModal(true);
    const handleAddModalClose = () => setOpenAddModal(false);
    const handleEditModalOpen = (user) => {
        setSelectedUser({ ...user });
        setOpenEditModal(true);
    };
    const handleEditModalClose = () => {
        setSelectedUser({});
        setOpenEditModal(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await userService
                .getAll()
                .then((response) => response.data);

            setUsers(response);
        };

        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        await userService.deleteById(userId).then((response) => response.data);

        const updatedUser = users.filter(
            (directory) => directory.id !== userId,
        );
        setUsers(updatedUser);
    };

    return (
        <>
            <Box
                sx={{ display: 'flex', justifyContent: 'end', marginBottom: 2 }}
            >
                <Button
                    variant="contained"
                    sx={{ width: '100%' }}
                    onClick={() => handleAddModalOpen()}
                >
                    Add User
                </Button>
            </Box>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                {users.length !== 0 ? (
                    users.map((user, idx) => (
                        <Grid xs={6} key={idx}>
                            <Paper>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: 2,
                                        }}
                                    >
                                        <Typography variant="h5">{`${user.firstname} ${user.lastname}`}</Typography>
                                        <Typography variant="body1">
                                            {user.email}
                                        </Typography>

                                        <Typography variant="subtitle1">
                                            {user.phoneNumber}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <EditIcon
                                            color="primary"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                handleEditModalOpen(user)
                                            }
                                        />
                                        <DeleteIcon
                                            color="error"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => deleteUser(user.id)}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Typography>
                        You have not registered a phone yet.
                    </Typography>
                )}
            </Grid>
            <UserAddModal
                open={openAddModal}
                handleClose={handleAddModalClose}
                setUsers={setUsers}
            />
            <UserEditModal
                open={openEditModal}
                handleClose={handleEditModalClose}
                setUsers={setUsers}
                selectedUser={selectedUser}
            />
        </>
    );
};

export default UserList;
