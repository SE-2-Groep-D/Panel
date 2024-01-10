import {lazy} from 'react';
const Voorbeeld = lazy(() => import('./voorbeeld/voorbeeld.jsx'));
const Navigation = lazy(() => import('./Navigation.jsx'));
const Home = lazy(() => import('./Home/Home.jsx'));
const UserHome = lazy(() => import('./Home/user/UserHome.jsx'));
const PrivacyStatement = lazy(() => import('./privacy-statement.jsx'));


export * from './account';
export * from './research';
export * from './news';

export { 
    Voorbeeld, 
    Navigation, 
    Home, 
    UserHome,
    PrivacyStatement
};