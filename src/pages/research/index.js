import {lazy} from 'react';

const Onderzoeken = lazy(() => import('./list/Onderzoeken.jsx'));
const OnderzoekInfo = lazy(() =>import("./info/OnderzoekInfo.jsx"));
const OnderzoekForm = lazy(() =>import("./create/onderzoekForm.jsx"));
const OnderzoekResultaten = lazy(() => import('./results/results.jsx'));

export {  
    Onderzoeken,
    OnderzoekInfo,
    OnderzoekForm,
    OnderzoekResultaten  
};