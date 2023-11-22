import React from 'react'
import { useState } from 'react'


export default function LoadingDiv({children, loading}) {    
    const className = (loading) ? 'loading-div loading' : 'loading-div ';
  return (
    <div className={className}>
        {children}
    </div>
  )
}
