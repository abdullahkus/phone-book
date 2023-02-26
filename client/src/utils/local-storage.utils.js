export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error setting localStorage key "${key}":`, e);
    }
};

export const getLocalStorage = (key, defaultValue) => {
    try {
        const value = localStorage.getItem(key);
        return value !== null ? JSON.parse(value) : defaultValue;
    } catch (e) {
        console.error(`Error getting localStorage key "${key}":`, e);
        return defaultValue;
    }
};

export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error(`Error removing localStorage key "${key}":`, e);
    }
};
