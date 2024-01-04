import {lazy} from 'react';

const Register = lazy(() => import('./register/register.jsx'));
const Login = lazy(() => import('./login/login.jsx'));
const SetupAccount = lazy(() => import('./setup/setupAccount.jsx'));

export {Register, Login, SetupAccount}