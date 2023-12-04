import { useContext } from 'react';
import { FormContext } from '../context/formcontext';

function useFormData() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormProvider');
  }
  return context;
}

export default useFormData;