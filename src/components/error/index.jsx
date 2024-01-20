import {lazy} from "react";

const ServerError = lazy(() => import('./ServerError.jsx'));
const NoPermission = lazy(() => import('./NoPermission.jsx'));

export {ServerError, NoPermission}