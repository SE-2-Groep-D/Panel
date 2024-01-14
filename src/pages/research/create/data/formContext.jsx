import { createContext, useReducer, useState } from "react";

export const FormContext = createContext();

const defaultState = {
    currentStep: 0,
    maxStep: 3,
};

export const FormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [formData, setFormData] = useState({
        onderzoekId: null,
        onderzoekNaam: null,
        // ... other form data
    });

    const nextStep = () => dispatch({ type: 'nextStep' });
    const prevStep = () => dispatch({ type: 'prevStep' });
    const lastStep = () => dispatch({ type: 'lastStep' });

    const updateFormData = (newData) => {
        setFormData({ ...formData, ...newData });
    };

    const contextValue = {
        state,
        nextStep,
        prevStep,
        lastStep,
        formData,
        updateFormData
    };

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'nextStep':
            return { ...state, currentStep: state.currentStep + 1 };
        case 'prevStep':
            return { ...state, currentStep: state.currentStep - 1 };
        case 'lastStep':
            return { ...state, currentStep: state.maxStep };
        default:
            return state;
    }
}
