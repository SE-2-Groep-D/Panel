import { createContext, useState } from 'react'


export const AuthContext = createContext();

const defaultAuth = {
    authenticated: false,
    userId: null,
    username: null,
    jwtoken: null,
}

export default function AuthProvider({children}) {
    const [auth, setAuth] = useState(defaultAuth);

    function loginUser(userId, username, jwtoken) {
        setAuth({
            authenticated: true,
            userId,
            username,
            jwtoken,
          });
    }
    
    
    function logoutUser() {
        setAuth({
          authenticated: false,
          userId: null,
          username: null,
          jwtoken: null,
        });
      }

  return (
    <AuthContext.Provider value={{...auth, loginUser, logoutUser}}>
        {children}
    </AuthContext.Provider>
  )
}

