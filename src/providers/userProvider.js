import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    const writeStorage = (key, data) => {
        sessionStorage.setItem(key, JSON.stringify(data))
    }

    const getStorage = (key) => {
        const data = sessionStorage.getItem(key)
        if (data) return JSON.parse(data)
        return null
    }

    const clearStorage = () => {
        sessionStorage.clear()
    }

    useEffect(() => {
        const storedUser = getStorage('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
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