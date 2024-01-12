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

  function logoutUser() {
    setAuth({
      authenticated: false,
      userInfo: null,
    });
    fetchData("Auth/Logout");
  }

  return (
    <AuthContext.Provider value={{ ...auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
