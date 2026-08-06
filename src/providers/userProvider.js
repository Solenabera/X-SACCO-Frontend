import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    const writeStorage = (key, data) => {
        if (data === undefined || data === null) {
            sessionStorage.removeItem(key)
            return
        }
        const valueToStore = typeof data === 'string' ? data : JSON.stringify(data)
        sessionStorage.setItem(key, valueToStore)
    }

    const getStorage = (key) => {
        const data = sessionStorage.getItem(key)
        if (!data) return null
        try {
            return JSON.parse(data)
        } catch (e) {
            return data
        }
    }

    const clearStorage = () => {
        sessionStorage.clear()
    }

    useEffect(() => {
        const storedUser = getStorage('user')
        if (storedUser) {
            const userData = storedUser?.member || storedUser?.user || storedUser
            setUser(userData)
        }
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,

                writeStorage,
                getStorage,
                clearStorage
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;