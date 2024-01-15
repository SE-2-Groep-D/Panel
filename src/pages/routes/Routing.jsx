// Routing.jsx
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
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
import { LoadingDiv, Chat } from "@components";
import PrivateRoute from "@pages/routes/ProtectedRoute.jsx";
import { useAuth } from "@hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonCircleCheck,
  faPersonCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import NewsList from "@pages/news/News.jsx";
import { useState } from "react";
import { checkSession } from "./checkSession";

function Routing() {
  const [loading, setLoading] = useState(true);
  checkSession(setLoading);

  if (loading) {
    return <LoadingDiv loading={true} />;
  }
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
            <Route path="/onderzoek/:onderzoekId" element={<OnderzoekInfo />} />
            <Route
              path="/onderzoek/:id/results"
              element={<OnderzoekResultaten />}
            />
            <Route path="/onderzoek/aanmaken" element={<OnderzoekForm />} />

            <Route path="/nieuwsbrief" element={<NewsList />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Chat />
    </BrowserRouter>
  );
}

const HomeRoute = () => {
  const { authenticated } = useAuth();
  return authenticated ? <UserHome /> : <Home />;
};

function NotFound() {
  return (
    <main className="not-found">
      <FontAwesomeIcon icon={faPersonCircleQuestion} className="person-icon" />
      <h1 className="heading-1">Pagina niet gevonden.</h1>
      <p className="text">Sorry maar we konden deze pagina niet vinden.</p>
      <Link to="/" className="back">
        Klik om terug naar de home pagina te gaan.
      </Link>
    </main>
  );
}

export default Routing;
