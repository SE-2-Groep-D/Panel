import React, { useState } from 'react';


import '@pagestyles/App.scss';
import Button from '@components/button/button.jsx'
import InputField from '@components/input/inputfield.jsx';
import Checkbox from '@components/input/checkbox.jsx';
import Switch from '@components/input/switch';
import LoadingDiv from '@components/loadingdiv'; 
import OptionsSelector from '@components/input/optionselector';


function App() {
  const [options, setOptions] = useState(['test', 'test2', 'test3']);
  

  return (
    <>
      <h1>Test The Sass</h1>
      <h2>Test the shortcut</h2>

  
      {/* <LoadingDiv>
      
        <Checkbox>I accept the privacy terms.</Checkbox>
        <Checkbox></Checkbox>
        <Switch />
        <Switch />
      </LoadingDiv> */}

      <InputField required>Email</InputField>
      <OptionsSelector required options={options}>Country</OptionsSelector>
     </>
  )
}

export default App
