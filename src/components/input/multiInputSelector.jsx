import React, { useState, useEffect } from 'react'

import {InputField, Icon} from '@components';

export default function MultiInputSelector({children, animation, options, id}) {
  const [possibleOptions, setOptions] = useState((options === undefined || options === null) ? [] : options);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [value, setValue] = useState('');

  function handleEnterClick(e) {
    if(e.key !== 'Enter') return;
    e.preventDefault();
    addOption();
  }

  function updateValue(e) {
    setValue(e.value);
  }

  function addOption() {
    if(value === '' || value === ' ' || selectedOptions.includes(value)) return;
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
      <InputField animation={animation} value={value} onChange={updateValue}>{children}</InputField>
      <ul>
        {selectedOptions.map((option, index) => {
          return <li key={index} tabIndex={0} onClick={removeOption} onKeyDown={removeOption}>
          {option}
            <Icon onClick={removeOption} type="close" size="16" color={"#4464EE"}/>
          </li>
        })}
      </ul>
    </div>

  )
}
