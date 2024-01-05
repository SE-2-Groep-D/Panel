import {lazy} from 'react';
const Voorbeeld = lazy(() => import('./voorbeeld/voorbeeld.jsx'));
const Navigation = lazy(() => import('./Navigation.jsx'));


export * from './account';
export * from './research';


export { 
    Voorbeeld, Navigation
};