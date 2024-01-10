import {lazy} from "react";

const Checkbox = lazy(() => import('./checkbox.jsx'));
const InputField = lazy(() => import('./inputfield.jsx'));
const OptionSelector = lazy(() => import('./optionselector.jsx'));
const Switch = lazy(() => import('./switch.jsx'));
const MultiInputSelector = lazy(() => import('./multiInputSelector.jsx'));

export {Checkbox, InputField, OptionSelector, Switch, MultiInputSelector}