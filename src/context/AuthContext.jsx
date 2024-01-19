import { createContext, useState } from "react";
import { fetchData } from "@api";

export const AuthContext = createContext();

const defaultAuth = {
  authenticated: false,
  userInfo: null,
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(defaultAuth);

  function loginUser(userId, userInfo) {
    setAuth({
      authenticated: true,
      userInfo,
    });
  }

  async function logoutUser() {
    try {
      await fetchData("Auth/Logout");
    } finally {
      setAuth({
        authenticated: false,
        userInfo: null,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ ...auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
