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
  Voorbeeld,
} from "@pages";
import { Suspense, useEffect } from "react";
import { LoadingDiv } from "@components";
import useAuth from "@hooks/useAuth.js";

function Routing() {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<SetupAccount />} />
          <Route path="/privacy" element={<PrivacyStatement />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<LoadingDiv loading={true} />}>
        <Routes>
          {/*default routes*/}

          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<SetupAccount />} />
          <Route path="/privacy" element={<PrivacyStatement />} />
          <Route path="*" element={<PageNotFound />} />

          <Route path="/" element={<UserHome />} />
          <Route path="/onderzoek" element={<Onderzoeken />} />
          <Route path="/onderzoek/:onderzoekId" element={<OnderzoekInfo />} />
          <Route
            path="/onderzoek/:id/results"
            element={<OnderzoekResultaten />}
          />
          <Route path="/onderzoek/aanmaken" element={<OnderzoekForm />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const PageNotFound = () => {
  return (
    <main>
      <h1 className="heading-1">404 - Pagina niet gevonden</h1>
      <p className="text">
        Oops, sorry wij hebben deze pagina niet kunnen vinden.
      </p>
      <a href="/">Klik hier om terug te gaan naar het hoofd scherm.</a>
    </main>
  );
};

export default Routing;
