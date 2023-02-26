import axois from '../utils/axios.util';

export const register = async (user) => {
    return await axois.post('/auth/register', user);
};

export const login = async (user) => {
    return await axois.post('/auth/authenticate', user);
};
