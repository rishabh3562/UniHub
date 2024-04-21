import { createContext,useContext, useState } from 'react';

// Creating a context
const UserContext = createContext();

// Creating a provider component
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    // Combining state values into a single value object
    const value = {
        user,
        setUser,
        userData,
        setUserData
    };

    // Providing the context value to children components
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// Creating a custom hook to consume the context
const useUserContext = () => useContext(UserContext);

export { UserContext, useUserContext, UserProvider };
