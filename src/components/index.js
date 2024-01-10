import {lazy} from "react";

const Button = lazy(() => import('./button/button.jsx'));
const Progressbar = lazy(() => import('./progress-bar.jsx'));
const Logo = lazy(() => import('./logo/logo.jsx'));
const CountingAnimation = lazy(() => import('./counting-animation.jsx'));

const Form = lazy(() => import('./form/form.jsx'));
const ToolTip = lazy(() => import('./tooltip.jsx'));

// input
export * from './input';
export * from './container';

export {Button, Progressbar, Logo, CountingAnimation, Form, ToolTip}

