import '@pagestyles/App.scss';

// import {SetupAccount} from "@pages";
import {Button} from '@components';
import { useState } from 'react';
import { useEffect } from 'react';

import {fetchData} from '@services/api';
import { SetupAccount } from '@pages';


function App() {
  const [data, setData] = useState(null);

  return (
    <> 
      <SetupAccount/>
    </>
  )
}

export default App
