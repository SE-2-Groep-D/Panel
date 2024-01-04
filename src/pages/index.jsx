import {lazy} from 'react';
const Voorbeeld = lazy(() => import('./voorbeeld/voorbeeld.jsx'));


export * from './account';
export * from './research';


export { 
    Voorbeeld, 
};