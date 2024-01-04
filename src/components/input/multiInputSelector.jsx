// eslint-disable-next-line react/prop-types
import PropTypes from 'prop-types';
import  { useState } from 'react';
import {ToolTip, Icon, InputField} from '@components';

export default function MultiInputSelector({
  children,
  id,
  value,
  onChange,
  placeholder,
  message,
}) {

  const [currentValue, setValue] = useState('');
  const [error, setError] = useState(null);

  /*function handleChange({value}) {
     setValue(value);
  }
*/
    function handleEnterClick(e) {
      if(e.key !== 'Enter') return;
      e.preventDefault();
      addOption();
    }

    function addOption() {
      if(currentValue === '' || currentValue === ' ') return;
      if(value.includes(currentValue)) {
        setError('Deze optie is al toegevoegd.');
        return;
      }

        if (onChange !== undefined && onChange !== null)
          onChange({
            id: id,
            oldValue: value,
            value: [...value, currentValue],
          });

      setValue('');
    }

    function removeOption(e) {
    if(e.key !== 'Enter' && e.key !== undefined && e.key !== null) return;
    const target = e.currentTarget;
    const option = target.innerText;
    const newOptions = value.filter((cp) => cp !== option);

    if (onChange !== undefined && onChange !== null)
    onChange({
      id: id,
      oldValue: value,
      value: newOptions,
    });
  }

  return (
    <div className='multi-input-selector' id={id} onKeyDown={handleEnterClick} value={value}>
      <ToolTip message='Druk op de enter toets om de optie toe te voegen.' position="top" error={error}> 
        <InputField 
          value={currentValue}
          placeholder={placeholder}
          message={message}
          onChange={({value}) => setValue(value)}
        >{children}</InputField>
      </ToolTip>

      <ToolTip message='Klik op het kruisje om dit item te verwijderen.' position="bottom"> 
        <ul>
          {value && value.map((option, index) => {
              return <li className='tag' key={index} tabIndex={0} onClick={removeOption} onKeyDown={removeOption}>
                        <label htmlFor={index}>{option}</label>
                        <button id={index} onClick={removeOption}> <Icon type="delete" size="13" color={"#4464EE"}/> </button>
                      </li>
          })}
        </ul>
      </ToolTip>
    </div>
  );
}

MultiInputSelector.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.object,
  ]),
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  message: PropTypes.string,
  required: PropTypes.bool,
};




// import React, { useState, useEffect } from 'react'

// import {InputField, ToolTip, Icon} from '@components';

// export default function MultiInputSelector({children, animation, options, id}) {
//   const [possibleOptions, setOptions] = useState((options === undefined || options === null) ? [] : options);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [value, setValue] = useState('');
//   const [error, setError] = useState(null);

//   function handleEnterClick(e) {
//     if(e.key !== 'Enter') return;
//     e.preventDefault();
//     addOption();
//   }

//   function updateValue(e) {
//     setValue(e.value);
//     setError(null);
//   }

  // function addOption() {
  //   if(value === '' || value === ' ') return;
  //   if(selectedOptions.includes(value)) {
  //     setError('Deze optie is al toegevoegd.');
  //     return;
  //   }

//     setSelectedOptions([...selectedOptions, value]);
//     setValue('');
//   }

//   function removeOption(e) {
//     if(e.key !== 'Enter' && e.key !== undefined && e.key !== null) return;
//     const target = e.currentTarget;
//     const option = target.innerText;
//     const newOptions = selectedOptions.filter((cp) => cp !== option);
//     setSelectedOptions(newOptions)
//   }

//   return (
//     <div className='multi-input-selector' id={id} onKeyDown={handleEnterClick} value={selectedOptions}>
      
//       <ToolTip message='Druk op de enter toets om de optie toe te voegen.' position="top" error={error}> 
//           <InputField animation={animation} value={value} onChange={updateValue}>{children}</InputField>
//       </ToolTip>
//       <ToolTip message='Klik op het kruisje om dit item te verwijderen.' position="bottom"> 
//         <ul>
//           {selectedOptions.map((option, index) => {
//             return <li className='tag' key={index} tabIndex={0} onClick={removeOption} onKeyDown={removeOption}>
//              <label htmlFor={index}>{option}</label>
//              <button id={index} onClick={removeOption}> <Icon type="delete" size="13" color={"#4464EE"}/> </button>
//             </li>
//           })}
//         </ul>
//       </ToolTip>
//     </div>

//   )
// }
