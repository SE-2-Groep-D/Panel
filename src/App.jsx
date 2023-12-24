import '@pagestyles/App.scss';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {lazy, Suspense, useState} from 'react';
import {LoadingDiv} from '@components';


// import pages
const ResearchResults = lazy(() => import('@pages/research').then(module => ({ default: module.Results })));


function App() {


    return (
      <Router>
        <Suspense fallback={<LoadingDiv/>}>
          <Routes>
            <Route path="/" element={<ResearchResults/>}/>
          </Routes>
        </Suspense>
      </Router>
    );
}

export default App
