import { fetchData } from "@api";
import { useEffect } from "react";
import { useAuth } from "@hooks";


const fetchSession = async () => {
    try {
      const response = await fetchData("Auth/Refresh");
      return response;
    } catch {
      return null;
    }
  };

function checkSession(setLoading) {
    const { loginUser } = useAuth();
  useEffect(() => {
    const checkUserSession = async () => {
      const response = await fetchSession();
      if (response != null) {
        loginUser(response.userId, response);
      }
      setTimeout(() => {
        setLoading(false);
      }, 800);
    };
    checkUserSession();
  }, []);
}
  export  {checkSession};