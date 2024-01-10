import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@hooks";

const PrivateRoutes = () => {
  return useAuth().authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
