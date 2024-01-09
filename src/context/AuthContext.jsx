import { createContext, useState } from "react";
import { ApiResponseError, fetchApi } from "@api";

export const AuthContext = createContext();

const checkAuth = async () => {
  try {
    const response = await fetchData("/Auth/Login");

    setIsIngelogd(true);
    navigate("/");
    console.log(response);
    loginUser(response.userId, response);
  } catch (error) {
    console.log("niet ingelogd");
  }
};

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
  }

  return (
    <AuthContext.Provider value={{ ...auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
