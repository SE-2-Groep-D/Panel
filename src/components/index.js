import {lazy} from "react";

export {default as Button} from './button/button.jsx';
export {default as Form} from './form/form.jsx';

const ProgressBar = lazy(() => import('./progress-bar.jsx'));
const Logo = lazy(() => import('./logo/logo.jsx'));
const CountingAnimation = lazy(() => import('./counting-animation.jsx'));

const ToolTip = lazy(() => import('./tooltip.jsx'));

// input
export * from './input';
export * from './container';
export * from './error'
export * from './news'

export {ProgressBar, Logo, CountingAnimation, ToolTip}

