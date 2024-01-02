// eslint-disable-next-line react/prop-types
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function OptionSelector({
  children,
  id,
  value,
  onChange,
  options,
}) {
    const [open, setOpen] = useState(false);

      const handleKeyPress = (e) => {
        switch(e.key) {
            case 'Enter':
                handleEnterClick(e);
                break;
        }
      };
  

    function handleChange(target, newValue) {
        setOpen(false);
        if(onChange !== null && onChange !== undefined) onChange({
            element: target,
            id: id,
            oldValue: value,
            value: newValue,
        });
    }
    
    
    function handleEnterClick(event) {
        const target = event.target;
        const activeElement = document.activeElement;
        const classList = activeElement.classList;

       
     // Check if the component is focused
        if (classList.contains('selector-value')) {
            setOpen(!open);
            return;
        } 
    
        if(classList.contains('option')) {
            handleChange(target, target.innerText)
            return;
        }
    }

  return(
    <div className='option-selector' value={value} id={id}>
        <label htmlFor={id}>{children}</label>

        <div className={(open) ? 'selector-value open' : 'selector-value'} tabIndex={0}  onKeyDown={handleKeyPress} onClick={() => {setOpen(!open)}}>
            <span>{value}</span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.8275 0.6725L0.5 2L8 9.5L15.5 2L14.1725 0.672499L8 6.845L1.8275 0.6725Z" fill="#111329"/>
            </svg>

        </div>
        <ul className='options-list'>
            {/* eslint-disable-next-line react/prop-types */}
            {options.map((option, key) => {
                return <li
                            className='option' 
                            key={key} 
                            onClick={(e) => handleChange(e.target, option)}
                            tabIndex={0}
                        >{option}</li>
            })}
        </ul>
    </div>);
}

OptionSelector.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.object,
  ]),
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  message: PropTypes.string,
  required: PropTypes.bool,
};


