import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import * as directoryService from '../../services/directory.service';
import DirectoryAddModal from '../../components/directory/directory-add-modal';
import DirectoryEditModal from '../../components/directory/directory-edit-modal';

const DirectoryList = () => {
    const [directories, setDirectories] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedDirectory, setSelectedDirectory] = useState({});

    const handleAddModalOpen = () => setOpenAddModal(true);
    const handleAddModalClose = () => setOpenAddModal(false);
    const handleEditModalOpen = (directory) => {
        setSelectedDirectory({ ...directory });
        setOpenEditModal(true);
    };
    const handleEditModalClose = () => {
        setSelectedDirectory({});
        setOpenEditModal(false);
    };

    useEffect(() => {
        const fetchDirectories = async () => {
            const response = await directoryService
                .getAll()
                .then((response) => response.data);

            setDirectories(response);
        };

        fetchDirectories();
    }, []);

    const deleteDirectory = async (directoryId) => {
        await directoryService
            .deleteById(directoryId)
            .then((response) => response.data);

        const updatedDirectories = directories.filter(
            (directory) => directory.id !== directoryId,
        );
        setDirectories(updatedDirectories);
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
                    Add
                </Button>
            </Box>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                {directories.length !== 0 ? (
                    directories.map((directory, idx) => (
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
                                        <Typography variant="h5">{`${directory.firstname} ${directory.lastname}`}</Typography>
                                        <Typography variant="subtitle1">
                                            {directory.phoneNumber}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <EditIcon
                                            color="primary"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                handleEditModalOpen(directory)
                                            }
                                        />
                                        <DeleteIcon
                                            color="error"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                deleteDirectory(directory.id)
                                            }
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
            <DirectoryAddModal
                open={openAddModal}
                handleClose={handleAddModalClose}
                setDirectories={setDirectories}
            />
            <DirectoryEditModal
                open={openEditModal}
                handleClose={handleEditModalClose}
                setDirectories={setDirectories}
                selectedDirectory={selectedDirectory}
            />
        </>
    );
};

export default DirectoryList;
