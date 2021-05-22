import { useState, useContext, createContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userContext, setUserContext] = useState(null)
  return (
    <UserContext.Provider value={{userContext, setUserContext}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);