import '@pagestyles/App.scss';

import {SetupAccount} from "@pages";
import {Research} from "@pages";

// import {SetupAccount} from "@pages";
import {Button} from '@components';
import { useState } from 'react';


import {fetchData} from '@services/api';
import { MultiInputSelector } from './components/input';
import AlgemeneOnderzoek from "@pages/research/AlgemeneOnderzoek.jsx";


function App() {
  const [data, setData] = useState(null);

  return (
    <>
        <AlgemeneOnderzoek/>
    </>

  )
}

export default App
