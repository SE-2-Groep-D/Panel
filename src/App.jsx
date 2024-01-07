import "@pagestyles/App.scss";

// Import libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// Import components
import { LoadingDiv } from "@components";

// Import Pages
import {
  Home,
  Navigation,
  Register, 
  Login, 
  PrivacyStatement,

  Voorbeeld,
  SetupAccount,

  // Research pages
  Onderzoeken,
  OnderzoekInfo,
  OnderzoekForm,
  OnderzoekResultaten

} from "@pages";




function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<LoadingDiv loading={true} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<SetupAccount />} />
          <Route path="/voorbeeld" element={<Voorbeeld />} />
          <Route path="/onderzoek" element={<Onderzoeken />} />
          <Route path="/onderzoek/:onderzoekId" element={<OnderzoekInfo />} />
          <Route path="/onderzoek/:id/results" element={<OnderzoekResultaten />} />
          <Route path="/onderzoek/aanmaken" element={<OnderzoekForm />} />
          <Route path="/privacy" element={<PrivacyStatement />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

