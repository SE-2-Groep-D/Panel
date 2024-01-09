import { createContext, useEffect, useState } from "react";
import { fetchData } from "@api";

export const AuthContext = createContext();

const defaultAuth = {
  authenticated: false,
  userInfo: null,
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(defaultAuth);

  useEffect(() => {
    try {
      (async () => {
        if (localStorage.getItem("auth")) {
          const response = await fetchData("/Auth/Refresh");
          loginUser(response.userId, response);
          console.log("wel ingelogd:)");
        } else {
          console.log("niet ingelogd:)");
        }
      })();
    } catch {
      console.log("nog niet ingelogd");
    }
  }, []);

  function loginUser(userId, userInfo) {
    setAuth({
      authenticated: true,
      userInfo,
    });
    localStorage.setItem("auth", true);
  }

  function logoutUser() {
    setAuth({
      authenticated: false,
      userInfo: null,
    });
    localStorage.setItem("auth", false);
  }

  return (
    <AuthContext.Provider value={{ ...auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
