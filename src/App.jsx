import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@pagestyles/App.scss";
import { Register, Login, Voorbeeld, SetupAccount } from "@pages";
import { LoadingDiv } from "@components";


const OnderzoekForm = React.lazy(() => import("@pages/research/onderzoekForm/onderzoekForm.jsx"));
const Onderzoeken = React.lazy(() => import("@pages/research/Onderzoeken.jsx"));
const OnderzoekInfo = React.lazy(() =>import("@pages/research/OnderzoekInfo.jsx"));
const ResearchResults = lazy(() => import('@pages').then(module => ({ default: module.Results })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingDiv loading={true} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<SetupAccount />} />
          <Route path="/voorbeeld" Component={Voorbeeld} />
          <Route path="/onderzoek" element={<Onderzoeken />} />
          <Route path="/onderzoek/:onderzoekId" element={<OnderzoekInfo />} />
          <Route path="/onderzoek/:id/results" element={<ResearchResults/>}/>
          <Route path="/onderzoek/aanmaken" element={<OnderzoekForm />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

function Home() {

    return <section>
        <a href='/setup'>click me</a>
    </section>
}
