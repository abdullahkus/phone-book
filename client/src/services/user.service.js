import axios from '../utils/axios.util';
import { getLocalStorage } from '../utils/local-storage.utils';

export const getAll = async () => {
    const jwtToken = getLocalStorage('access-token');

    return await axios.get('/users', {
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
    });
};

export const getUser = async (email) => {
    const jwtToken = getLocalStorage('access-token');
    return await axios.get(`/users/${email}`, {
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
    });
};

export const save = async (user) => {
    const jwtToken = getLocalStorage('access-token');
    return await axios.post('/users', user, {
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
    });
};

export const update = async (userId, user) => {
    const jwtToken = getLocalStorage('access-token');
    return await axios.put(`users/${userId}`, user, {
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
    });
};

export const deleteById = async (id) => {
    const jwtToken = getLocalStorage('access-token');
    return await axios.delete(`/users/${id}`, {
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
    });
};
