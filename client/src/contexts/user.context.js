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
    const [jwtToken, setJwtToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            if (jwtToken) {
                const userEmail = jwtDecode(jwtToken).sub;
                const user = await userService
                    .getUser(userEmail)
                    .then((response) => response.data);
                setCurrentUser(user);
            }
        };

        getUser();
    }, [jwtToken]);

    useEffect(() => {
        if (currentUser?.enabled === false) {
            removeLocalStorage('access-token');
            setCurrentUser(null);
        }
    }, [currentUser?.enabled]);

    const value = { currentUser, setCurrentUser, setJwtToken };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
