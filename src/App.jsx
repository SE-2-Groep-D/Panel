import React, { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@pagestyles/App.scss';

// Lazy loading van pagina componenten
const AlgemeneOnderzoek = React.lazy(() => import('@pages/research/AlgemeneOnderzoek.jsx'));
const Onderzoek = React.lazy(() => import('@pages/research/Onderzoek.jsx'));

function App() {
    const [data, setData] = useState(null);

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/onderzoek" element={<AlgemeneOnderzoek />} />
                    <Route path="/onderzoek/:onderzoekId" element={<Onderzoek />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
