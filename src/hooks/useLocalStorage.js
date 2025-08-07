import { useState } from 'react';
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            if (typeof window === 'undefined') {
                return initialValue;
            }
            const item = window.localStorage.getItem(key);
            // For theme mode, store as plain string, not JSON
            if (key === 'color-mode' && item) {
                return item;
            }
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                // For theme mode, store as plain string
                if (key === 'color-mode') {
                    window.localStorage.setItem(key, valueToStore);
                }
                else {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            }
        }
        catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };
    const removeValue = () => {
        try {
            setStoredValue(initialValue);
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
        }
        catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    };
    return [storedValue, setValue, removeValue];
};
export const getLocalStorageItem = (key) => {
    try {
        if (typeof window === 'undefined') {
            return null;
        }
        return window.localStorage.getItem(key);
    }
    catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return null;
    }
};
export const setLocalStorageItem = (key, value) => {
    try {
        if (typeof window === 'undefined') {
            return false;
        }
        window.localStorage.setItem(key, value);
        return true;
    }
    catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
        return false;
    }
};
