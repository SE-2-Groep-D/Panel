// eslint-disable-next-line react/prop-types
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function InputField({
  children,
  type,
  id,
  value,
  onChange,
  placeholder,
  message,
  size,
  required,
}) {
  const isTextArea =
    size !== undefined && size !== null && size.toLowerCase() === 'big';

  const finalPlaceHolder =
    placeholder === undefined || placeholder === null ? children : placeholder;

  const Field = isTextArea ? (
    <textarea
      id={"input_" + id}
      type={type || 'text'}
      value={value}
      onChange={handleChange}
      placeholder={finalPlaceHolder}
      required={required}
      rows={5}
    />
  ) : (
    <input
      type={type || 'text'}
      id={"input_" + id}
      value={value}
      onChange={handleChange}
      placeholder={finalPlaceHolder}
      required={required}
    />
  );

  function handleChange(e) {
    const newValue = e.target.value;
    
    if (onChange !== undefined && onChange !== null)
      onChange({
        element: e.target.parentNode,
        oldValue: value,
        value: newValue,
      });
  }

  return (
    <div className="inputField" id={id} value={value}>
      <label htmlFor={"input_" + id}>{children}</label>
      <p className="message">{message}</p>
      {Field}
    </div>
  );
}

InputField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.object,
  ]),
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  message: PropTypes.string,
  size: PropTypes.oneOf(['big', 'small']),
  required: PropTypes.bool,
};
