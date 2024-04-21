import React, { useEffect } from 'react'
import { useUserContext } from './UserProvider'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthProvider = ({children}) => {
    const { setUser } = useUserContext();
    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
            }
            else{
                setUser(null);
            }
        })

        return () => unsubscribe();
    }, [auth, setUser])

  return (
    <>
      {children}
    </>
  )
}

export default AuthProvider
