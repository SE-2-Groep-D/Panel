import React from 'react'

export default function ToolTip({children, message, position, error}) {
  var className = (error !== null && error !== undefined) ? 'tool-tip error' : 'tool-tip';
  var msg = (error !== null && error !== undefined) ? error : message;

  switch (position) {
    case 'bottom': 
    className += ' bottom';
    break;

    case 'left':
      className += ' left';
    break;

    case 'right':
      className += ' right';
    break;

    default: 
    className += ' top';
    break;
  }

  return (
    <div className={className}>
        {children}
        <label className='tool-tip__message'>{msg}</label>
    </div>
  )
}
