import {lazy} from 'react';
const Navigation = lazy(() => import('./Navigation.jsx'));
const Home = lazy(() => import('./home/Home.jsx'));
const UserHome = lazy(() => import('./account/home/UserHome.jsx'));
const PrivacyStatement = lazy(() => import('./privacy-statement.jsx'));


export * from './account';
export * from './research';
export * from './news';

export {
    Navigation, 
    Home, 
    UserHome,
    PrivacyStatement
};