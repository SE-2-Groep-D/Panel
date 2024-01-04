import React from 'react'
import { useState } from 'react'


export default function LoadingDiv({children, loading, className}) {    
    if(className === undefined) {
      className = (loading) ? 'loading-div loading' : ' loading-div';
    } else {
      className += (loading) ? ' loading-div loading' : ' loading-div';
    }

  return (
    <div className={className}>
        {children}
    </div>
  )
}
