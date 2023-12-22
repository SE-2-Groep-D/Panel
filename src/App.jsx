import '@pagestyles/App.scss';

// import {SetupAccount} from "@pages";
import {Button} from '@components';
import { useState } from 'react';
import { useEffect } from 'react';

import {fetchData} from '@services/api';
import { MultiInputSelector } from './components/input';

function App() {
  const [data, setData] = useState(null);

  return (
    <> 
      <MultiInputSelector animation={false}>Hulpmiddelen</MultiInputSelector>
    </>
  )
}

export default App
