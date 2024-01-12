import {lazy} from "react";

const LoadingDiv = lazy(() => import('./loadingdiv.jsx'));
const Modal = lazy(() => import('./modal.jsx'));

export {LoadingDiv, Modal}