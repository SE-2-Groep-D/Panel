// Routing.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Navigation,
  Onderzoeken,
  OnderzoekForm,
  OnderzoekInfo,
  OnderzoekResultaten,
  PrivacyStatement,
  Register,
  SetupAccount,
  UserHome,
} from "@pages";

import { Suspense } from "react";
import { LoadingDiv } from "@components";
import PrivateRoute from "@pages/routes/ProtectedRoute.jsx";
import { useAuth } from "@hooks";
import { useState, useEffect } from "react";
import { fetchData } from "@api";

function Routing() {
  const { loginUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const checkSession = async () => {
    try {
      const response = await fetchData("Auth/Refresh");
      return response;
    } catch {
      console.log("er ging iets mis.");
      return null;
    }
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const response = await checkSession();
      if (response != null) {
        loginUser(response.userId, response);
      }
      setTimeout(() => {
        setLoading(false);
      }, 800);
      console.log("check");
      console.log(response);
    };
    checkUserSession();
  }, []);

  if (loading) {
    return <LoadingDiv loading={true} />;
  } else {
    return (
      <BrowserRouter>
        <Navigation />
        <Suspense fallback={<LoadingDiv loading={true} />}>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setup" element={<SetupAccount />} />
            <Route path="/privacy" element={<PrivacyStatement />} />

            <Route element={<PrivateRoute />}>
              <Route path="/onderzoek" element={<Onderzoeken />} />
              <Route
                path="/onderzoek/:onderzoekId"
                element={<OnderzoekInfo />}
              />
              <Route
                path="/onderzoek/:id/results"
                element={<OnderzoekResultaten />}
              />
              <Route path="/onderzoek/aanmaken" element={<OnderzoekForm />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }
}

const HomeRoute = () => {
  const { authenticated } = useAuth();
  return authenticated ? <UserHome /> : <Home />;
};

export default Routing;
