import { useEffect, useState} from 'react';
import PropTypes from 'prop-types';


export default function OptionsSelector({
                                        children, 
                                        options,
                                        id,
                                        message,
                                        value, 
                                        onChange,
}) {
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if(value !== undefined) return;
            handleSelect(null, options[0]);
    })

   

    const handleKeyPress = (e) => {
        switch(e.key) {
            case 'Enter':
                handleEnterClick(e);
                break;
        }
      };
  

    function handleSelect(target, newValue) {
        setOpen(false);
        if(onChange !== null && onChange !== undefined) onChange({
            element: target,
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
            handleSelect(target, target.innerText)
            return;
        }
    }

    return(
        <option-selector className='option-selector' value={value} id={id}>
            <label htmlFor={id}>{children}</label>

            <div id={id} className={(open) ? 'selector-value open' : 'selector-value'} tabIndex={0}  onKeyDown={handleKeyPress} onClick={() => {setOpen(!open)}}>
                <span>{value}</span>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.8275 0.6725L0.5 2L8 9.5L15.5 2L14.1725 0.672499L8 6.845L1.8275 0.6725Z" fill="#111329"/>
                </svg>

            </div>
            <ul className='options-list'>
                {/* eslint-disable-next-line react/prop-types */}
                {options.map((option, key) => {
                    return <option 
                                className='option' 
                                key={key} 
                                onClick={(e) => {handleSelect(e.target, option);}}
                                onKeyDown={handleKeyPress}
                                tabIndex={0}
                            >{option}</option>
                })}
            </ul>
        </option-selector>
    );
}


OptionsSelector.propTypes = {
    children: PropTypes.any,
    options: PropTypes.array,
    id: PropTypes.string,
    message: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
