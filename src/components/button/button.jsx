import React from 'react' 

export default function Button({className, children, onClick, color, varient, type}) {
  className = (className === null || className === undefined) ? getButtonClasses(color, varient) : + getButtonClasses(color, varient) + ' ' + className

  return (
    <button type={type}
    className={className}
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

function getButtonClasses(color, varient) {
  var className = "btn";

  switch(varient) {
    case varients.OUTLINED:
        className += " " + varients.OUTLINED;
      break;
    case varients.TEXT:
        className +=  " " + varients.TEXT;
      break;
  }

  switch(color) {
    case colors.SECONDARY: 
      className += colors.SECONDARY;
    break;

    case colors.TERTIARY:
      className += colors.TERTIARY;
    break;
  }

  return className;
}


