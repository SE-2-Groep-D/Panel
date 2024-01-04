import {lazy} from 'react';

const Register = lazy(() => import('./register/register.jsx'));
const Login = lazy(() => import('./login/login.jsx'));
const Voorbeeld = lazy(() => import('./voorbeeld/voorbeeld.jsx'));
const SetupAccount = lazy(() => import('./setup-account/setupAccount.jsx'));

const Onderzoeken = lazy(() => import('./research/Onderzoeken.jsx'));
const OnderzoekInfo = lazy(() =>import("./research/OnderzoekInfo.jsx"));
const OnderzoekForm = lazy(() =>import("./research/onderzoekForm/onderzoekForm.jsx"));
const OnderzoekResultaten = lazy(() => import('./research-results/results.jsx'));


export { 
    Register, 
    Login, 
    Voorbeeld,
    SetupAccount,
  
    // Research pages
    Onderzoeken,
    OnderzoekInfo,
    OnderzoekForm,
    OnderzoekResultaten  
};


