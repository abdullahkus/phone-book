import { createContext, useState, useEffect } from 'react';
import { getLocalStorage } from '../utils/local-storage.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const jwtToken = getLocalStorage('access-token');
        if (jwtToken) setCurrentUser(jwtToken);
    }, []);

    const value = { currentUser, setCurrentUser };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
