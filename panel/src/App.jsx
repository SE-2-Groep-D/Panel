import React, { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@pagestyles/App.scss';

import {SetupAccount} from "@pages";
import OnderzoekForm from "@pages/research/onderzoekForm/onderzoekForm.jsx";
// Lazy loading van pagina componenten
const AlgemeneOnderzoek = React.lazy(() => import('@pages/research/AlgemeneOnderzoek.jsx'));
const Onderzoek = React.lazy(() => import('@pages/research/Onderzoek.jsx'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/onderzoek" element={<AlgemeneOnderzoek />} />
                    <Route path="/onderzoek/:onderzoekId" element={<Onderzoek />} />
                    <Route path="/setup" element={<SetupAccount />} />
                    <Route path="/onderzoek/aanmaken" element={<OnderzoekForm />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
