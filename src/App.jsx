import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@pagestyles/App.scss';
import {SetupAccount} from "@pages";
import {LoadingDiv} from "@components";


const OnderzoekForm = React.lazy(() => import("@pages/research/onderzoekForm/onderzoekForm.jsx"));
const Onderzoeken = React.lazy(() => import('@pages/research/Onderzoeken.jsx'));
const OnderzoekInfo = React.lazy(() => import('@pages/research/OnderzoekInfo.jsx'));
const ResearchResults = lazy(() => import('@pages').then(module => ({ default: module.Results })));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingDiv loading={true} />}>
                <Routes>
                    <Route path="/setup" element={<SetupAccount />} />
                    <Route path="/onderzoek" element={<Onderzoeken />} />
                    <Route path="/onderzoek/:onderzoekId" element={<OnderzoekInfo />} />
                    <Route path="/onderzoek/aanmaken" element={<OnderzoekForm />} />  
                    <Route path="/onderzoek/results/:id" element={<ResearchResults/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
