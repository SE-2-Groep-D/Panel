import React from 'react' 

export default function Button({className, children, onClick, color, varient, type}) {
  return (
    <button type={type}
    className={getButtonClasses(color, varient) + ' ' + className}
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


