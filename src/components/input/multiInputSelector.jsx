import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToolTip, InputField } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {generateCustomId} from "@utils";

export default function MultiInputSelector({
                                             children,
                                             id,
                                             value,
                                             onChange,
                                             placeholder,
                                             message,
                                           }) {
  const [currentValue, setCurrentValue] = useState('');
  const [error, setError] = useState(null);
  id = (id !== null && id !== undefined)? id : generateCustomId(7);

  function handleEnterClick(e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    addOption();
  }

  function addOption() {
    if (currentValue.trim() === '') return;
    if (value.includes(currentValue)) {
      setError('Deze optie is al toegevoegd.');
      return;
    }

    if (onChange !== undefined && onChange !== null)
      onChange({
        id: id,
        oldValue: value,
        value: [...value, currentValue.trim()],
      });

    setCurrentValue('');
  }

  function removeOption(e) {
    if (e.key !== 'Enter' && e.key !== undefined && e.key !== null) return;
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
      <div
          className='multi-input-selector'
          id={id}
          onKeyDown={handleEnterClick}
          value={value}
      >
        <ToolTip
            message='Druk op de enter toets om de optie toe te voegen.'
            position='top'
            error={error}
        >
          <InputField
              value={currentValue}
              placeholder={placeholder}
              message={message}
              onChange={({ value }) => setCurrentValue(value)}
          >
            {children}
          </InputField>
        </ToolTip>

        <ToolTip
            message='Druk op de optie om deze te verwijderen.'
            position='bottom'
        >
          <ul>
            {value &&
                value.map((option, index) => (
                    <li
                        className='tag'
                        key={index}
                        tabIndex={0}
                        onClick={removeOption}
                        onKeyDown={removeOption}
                    >
                      <label htmlFor={index}>{option}</label>
                      <button id={index} onClick={removeOption} aria-label={'Klik deze knop om de optie: ' + option + " te verwijderen."}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                ))}
          </ul>
        </ToolTip>
      </div>
  );
}

MultiInputSelector.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  message: PropTypes.string,
  required: PropTypes.bool,
};
