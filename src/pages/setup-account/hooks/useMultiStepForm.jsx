import {useReducer} from 'react';

const defaultState = {
    currentStep: 0,
    maxStep: 3,
}

function formReducer(state, action) {
    switch (action.type) {
        case 'NEXT_STAGE':
            return {...state, currentStep: (state.currentStep >= state.maxStep) ? state.maxStep : state.currentStep++};
        case 'PREVIOUS_STAGE':
            return {...state, currentStep: (state.currentStep == 0) ? 0 : state.currentStep--};
        default:
            return state;
    }
}


function useMultiStepForm() {
    const [state, dispatch] = useReducer(formReducer, defaultState);
    const nextStep = () => dispatch({type: 'NEXT_STAGE'});
    const prevStep = () => dispatch({type: 'PREVIOUS_STAGE'});

    return {
        data: state,
        nextStep,
        prevStep,
    }
}

export default useMultiStepForm;