import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@pagestyles/App.scss';
import {SetupAccount} from "@pages";
import {LoadingDiv} from "@components";
const OnderzoekForm = React.lazy(() => import("@pages/research/onderzoekForm/onderzoekForm.jsx"));
const Onderzoeken = React.lazy(() => import('@pages/research/Onderzoeken.jsx'));
const OnderzoekInfo = React.lazy(() => import('@pages/research/OnderzoekInfo.jsx'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingDiv loading={true} />}>
                <Routes>
                    <Route path="/onderzoek" element={<Onderzoeken />} />
                    <Route path="/onderzoek/:onderzoekId" element={<OnderzoekInfo />} />
                    <Route path="/setup" element={<SetupAccount />} />
                    <Route path="/onderzoek/aanmaken" element={<OnderzoekForm />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
