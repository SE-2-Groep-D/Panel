import {useState} from 'react'

export default function Switch() {
  return (
    <label className="switch">
        <input type="checkbox" className="switch-cb"/>
        <span className='switch-button'></span>
    </label>
  )
}
