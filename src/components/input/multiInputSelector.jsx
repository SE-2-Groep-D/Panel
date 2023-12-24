import React, { useState, useEffect } from 'react'

import {InputField, ToolTip, Icon} from '@components';

export default function MultiInputSelector({children, animation, options, id}) {
  const [possibleOptions, setOptions] = useState((options === undefined || options === null) ? [] : options);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  function handleEnterClick(e) {
    if(e.key !== 'Enter') return;
    e.preventDefault();
    addOption();
  }

  function updateValue(e) {
    setValue(e.value);
    setError(null);
  }

  function addOption() {
    if(value === '' || value === ' ') return;
    if(selectedOptions.includes(value)) {
      setError('Deze optie is al toegevoegd.');
      return;
    }

    selectedOptions.push(value);
    setValue('');
  }

  function removeOption(e) {
    if(e.key !== 'Enter' && e.key !== undefined && e.key !== null) return;
    const target = e.currentTarget;
    const option = target.innerText;
    const newOptions = selectedOptions.filter((cp) => cp !== option);
    setSelectedOptions(newOptions)
  }

  return (
    <div className='multi-input-selector' id={id} onKeyDown={handleEnterClick} value={value}>
      
      <ToolTip message='Druk op de enter toets om de optie toe te voegen.' position="top" error={error}> 
          <InputField animation={animation} value={value} onChange={updateValue}>{children}</InputField>
      </ToolTip>
      <ToolTip message='Klik op het kruisje om dit item te verwijderen.' position="bottom"> 
        <ul>
          {selectedOptions.map((option, index) => {
            return <li className='tag' key={index} tabIndex={0} onClick={removeOption} onKeyDown={removeOption}>
             <label htmlFor={index}>{option}</label>
             <button id={index} onClick={removeOption}> <Icon type="delete" size="13" color={"#4464EE"}/> </button>
            </li>
          })}
        </ul>
      </ToolTip>
    </div>

  )
}
