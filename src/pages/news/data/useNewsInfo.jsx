import {useContext} from 'react';
import {NewsContext} from './newsContext.jsx';

export const useNewsInfo = () => {
    const context = useContext(NewsContext);

    if (!context) {
      throw new Error('useNewsInfo must be used within a FormProvider');
    }
    return context;
  };