import { useState, useEffect } from 'react';


export default function OptionsSelector({children, options, name, message, required, disabled, onChange}) {
    const [value, setValue] = useState(options[0]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const handleKeyPress = (e) => {
            switch(e.key) {
                case 'Enter':
                    handleEnterClick(e);
                    break;
            }
          };
      
          document.addEventListener('keydown', handleKeyPress);
    });


    function handleSelect(target, newValue) {
        setOpen(false);
        onChange(value, newValue);
        setValue(newValue)
    }
    
    
    function handleEnterClick(event) {
        if(disabled) return;
        const target = event.target;
        const activeElement = document.activeElement;
        const classList = activeElement.classList;

       
     // Check if the component is focused
        if (classList.contains('selector-value')) {
            setOpen(!open);
            return;
        } 
    
        if(classList.contains('option')) {
            handleSelect(target, target.innerText)
            return;
        }
    }




    return(
        <option-selector className='option-selector' value={value} disabled={disabled}>
            <label htmlFor={name}>{children}</label>

            <div name={name} className={(open) ? 'selector-value open' : 'selector-value'} tabIndex={0}  onClick={() => {setOpen(!open)}}>
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
                                onClick={(e) => {handleSelect(e.target, option);}}
                                tabIndex={0}
                            >{option}</li>
                })}
            </ul>
        </option-selector>
    );
}

