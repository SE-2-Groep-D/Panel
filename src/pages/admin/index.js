import {lazy} from 'react';
const UserList = lazy(() => import('./user/UserList.jsx'));
const CreateUser = lazy(() => import('./user/CreateUser.jsx'));



export { UserList, CreateUser };