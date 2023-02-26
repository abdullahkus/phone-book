import axios from '../utils/axios.util';
import { getLocalStorage } from '../utils/local-storage.utils';

export const getAll = async () => {
    const jwtToken = getLocalStorage('access-token');
    return await axios.get('/directories', {
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
    });
};

export const save = async (directory) => {
    const jwtToken = getLocalStorage('access-token');
    return await axios.post('directories', directory, {
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
    });
};

export const update = async (directoryId, directory) => {
    const jwtToken = getLocalStorage('access-token');
    return await axios.put(`directories/${directoryId}`, directory, {
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
    });
};

export const deleteById = async (directoryId) => {
    const jwtToken = getLocalStorage('access-token');
    return await axios.delete(`directories/${directoryId}`, {
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
    });
};
