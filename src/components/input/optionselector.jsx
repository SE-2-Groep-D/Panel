import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {generateCustomId} from "../../utils/index.js";

export default function OptionsSelector({
                                            children,
                                            options,
                                            id,
                                            message,
                                            value,
                                            onChange,
                                        }) {
    const [open, setOpen] = useState(false);
    id = (id !== null && id !== undefined)? id : generateCustomId(7);

    useEffect(() => {
        if (value !== undefined) return;
        handleSelect(null, options[0]);
    }, [value, options]);

    const handleKeyPress = (e) => {
        switch (e.key) {
            case 'Enter':
                handleEnterClick(e);
                break;
        }
    };

    function handleSelect(target, newValue) {
        setOpen(false);
        if (onChange !== null && onChange !== undefined)
            onChange({
                element: target,
                oldValue: value,
                value: newValue,
                id: id,
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

        if (classList.contains('option')) {
            handleSelect(target, target.innerText);
            return;
        }
    }

    return (
        <div
            className='option-selector'
            value={value}
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-owns={`${id}-options`}
            aria-live="assertive"
        >
            <label id={`${id}-label`} htmlFor={id}>
                {children}
            </label>

            <div
                id={id}
                className={(open) ? 'selector-value open' : 'selector-value'}
                tabIndex={0}
                onKeyDown={handleKeyPress}
                onClick={() => { setOpen(!open) }}
                aria-activedescendant={`${id}-active-option`}
                aria-labelledby={`${id}-label`}
            >
                <span>{value}</span>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.8275 0.6725L0.5 2L8 9.5L15.5 2L14.1725 0.672499L8 6.845L1.8275 0.6725Z" fill="#111329" />
                </svg>
            </div>
            <ul
                id={`${id}-options`}
                className='options-list'
                role="listbox"
            >
                {options.map((option, key) => {
                    const optionId = `${id}-option-${key}`;
                    return (
                        <li
                            id={optionId}
                            className='option'
                            key={key}
                            onClick={(e) => { handleSelect(e.target, option); }}
                            onKeyDown={handleKeyPress}
                            tabIndex={0}
                            role="option"
                            aria-selected={value === option}
                        >{option}</li>
                    );
                })}
            </ul>
        </div>
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
