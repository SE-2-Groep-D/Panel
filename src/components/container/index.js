import {lazy} from "react";

const LoadingDiv = lazy(() => import('./loadingdiv.jsx'));
const LoadingData = lazy(() => import('./loading-data.jsx'));
const Modal = lazy(() => import('./modal.jsx'));

export {LoadingDiv, Modal}