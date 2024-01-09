import { createContext, useState } from 'react'


export const AuthContext = createContext();

const defaultAuth = {
    authenticated: false,
    userInfo: null,
}

export function AuthProvider({children}) {
    const [auth, setAuth] = useState(defaultAuth);

    console.log('auth render');

    function loginUser(userId, userInfo) {
        setAuth({
            authenticated: true,
            userInfo,
          });
    }
    
    
    function logoutUser() {
        setAuth({
          authenticated: false,
          userInfo: null,
        });
      }

  return (
    <AuthContext.Provider value={{...auth, loginUser, logoutUser}}>
        {children}
    </AuthContext.Provider>
  )
}

