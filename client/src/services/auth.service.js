import axios from '../utils/axios.util';

export const register = async (user) => {
    return await axios.post('/auth/register', user);
};

export const login = async (user) => {
    return await axios.post('/auth/authenticate', user);
};
