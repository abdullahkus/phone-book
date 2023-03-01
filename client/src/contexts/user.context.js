import { createContext, useState, useEffect } from 'react';
import {
    getLocalStorage,
    removeLocalStorage,
} from '../utils/local-storage.utils';
import jwtDecode from 'jwt-decode';
import * as userService from '../services/user.service';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {},
    setJwtToken: () => {},
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const localJwtToken = await getLocalStorage('access-token');
            if (localJwtToken) {
                const userEmail = jwtDecode(localJwtToken).sub;
                const user = await userService
                    .getUser(userEmail)
                    .then((response) => response.data);
                setCurrentUser(user);
            }
        };

        getUser();
    }, []);

    useEffect(() => {
        if (currentUser?.enabled === false) {
            removeLocalStorage('access-token');
            setCurrentUser(null);
        }
    }, [currentUser?.enabled]);

    const value = { currentUser, setCurrentUser };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
