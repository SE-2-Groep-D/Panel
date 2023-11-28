import {useState} from 'react'

export default function Switch({onChange}) {
  return (
    <label className="switch">
        <input type="checkbox"  onChange={onChange} className="switch-cb"/>
        <span className='switch-button'></span>
    </label>
  )
}
