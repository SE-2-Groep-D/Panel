import '@pagestyles/App.scss';

// import {SetupAccount} from "@pages";
import {Button} from '@components';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  function fetchData() {
    fetch('/api/WeatherForecast')
    .then(res => res.json())
    .then(data => {
      setData(data);
    })
    .catch(err => {
      console.log(err);
    })
  }
  

  return (
    <> 
      <p> {(data) ? data[0].date : 'no-date'} </p>
      <Button onClick={fetchData}>Update date</Button>
    </>
  )
}

export default App
