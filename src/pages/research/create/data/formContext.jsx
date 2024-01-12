import { createContext, useReducer } from "react";

export const FormContext = createContext();

const defaultState = {
    currentStep: 0,
    maxStep: 3,
}

export const FormProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, defaultState);


    const nextStep = () => dispatch({type: 'nextStep'});
    const prevStep = () => dispatch({type: 'prevStep'});
    const lastStep = () => dispatch({type: 'lastStep'});


    const data = {state, nextStep, prevStep,lastStep}

    return <FormContext.Provider value={data}>
        {children}
    </FormContext.Provider>
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'nextStep':
            return {...state, currentStep: state.currentStep + 1};
        case 'prevStep':
            return {...state, currentStep: state.currentStep - 1};
        case 'lastStep':
            return {...state, currentStep: state.maxStep};
        default:
            return state;
    }
}


