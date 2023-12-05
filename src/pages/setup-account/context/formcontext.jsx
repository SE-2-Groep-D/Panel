import {createContext, useReducer} from 'react';

const FormContext = createContext();

function FormProvider({ children }) {
  const [formData, dispatch] = useReducer(onChange, defaultState);

  return (
    <FormContext.Provider value={{ formData, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export { FormContext, FormProvider };

const defaultState = {
    currentStage: 0,
    maxStage: 3,
}

function onChange(state, action) {

  switch (action.type) {
    case 'NEXT_STAGE':
      return {...state, currentStage: state.currentStage++};
    case 'PREVIOUS_STAGE':
      return {...state, currentStage: state.currentStage--};
    default:
      return state;
  }
}
