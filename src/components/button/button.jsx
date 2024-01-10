import React from 'react'
import PropTypes from "prop-types";

export default function Button({className, children, onClick, color, varient, type}) {
  const finalClassName = (className === null || className === undefined) ? getButtonClasses(color, varient) : getButtonClasses(color, varient) + ' ' + className;

  return (
    <button type={type}
    className={finalClassName}
    onClick={onClick}
      >{children}</button>
  )
}

const colors = {
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary'
}

const varients = {
  OUTLINED: 'outlined',
  TEXT: 'text',
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(Object.values(colors)), // Pass array of color values
  variant: PropTypes.oneOf(Object.values(varients)), // Pass array of variant values
  type: PropTypes.string
};



function getButtonClasses(color, varient) {
  var className = "btn";

  switch(varient) {
    case varients.OUTLINED:
        className += " " + varients.OUTLINED;
      break;
    case varients.TEXT:
        className += " " + varients.TEXT;
      break;
  }

  switch(color) {
    case colors.SECONDARY: 
      className += " " + colors.SECONDARY;
    break;

    case colors.TERTIARY:
      className += " " + colors.TERTIARY;
    break;
  }

  return className;
}


