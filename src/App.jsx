import '@pagestyles/App.scss';

// import {SetupAccount} from "@pages";
import {Button} from '@components';
import { useState } from 'react';
import { useEffect } from 'react';

import {fetchData} from '@services/api';

function App() {
  const [data, setData] = useState(null);

  async function updateData() {
    var returnedData = await fetchData('/WeatherForecast');
    setData(returnedData);
  }
  

  return (
    <> 
      <p> {(data) ? data[0].date : 'no-date'} </p>
      <Button onClick={updateData}>Update date</Button>
    </>
  )
}

export default App
