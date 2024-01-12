import {useContext} from 'react';
import {FormContext} from './formContext.jsx';

export const useForm = () => {
    const context = useContext(FormContext);

    if (!context) {
      throw new Error('useNewsInfo must be used within a FormProvider');
    }
    return context;
  };