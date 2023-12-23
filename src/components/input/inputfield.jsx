// eslint-disable-next-line react/prop-types
import {useState} from "react";

export default function InputField({children, type, name, id, message, required, disabled, animation, onChange, value}) {
    name = (name === undefined || name === null) ? "field" : name;

    const inputField = (required)? 
        <input id={id} type={getInputType(type)} placeholder={children} onChange={handleChange} required value={value}></input> :
        <input id={id} type={getInputType(type)} placeholder={children} onChange={handleChange} value={value}></input>

    function handleChange(e) {
        if(onChange !== undefined && onChange !== null) onChange({
            element: e.target.parentNode,
            oldValue: value,
            value: e.target.value,
        })
    }

    if(required && message === null || message === undefined) message = 'verplicht*';
  return (
    <div className={(animation !== true) ? 'inputField visible' : 'inputField'} id={id}>
        <p className='message'>{message}</p>
        {inputField}
        <label htmlFor={name}>{children}</label>
    </div>
  )
}

function getInputType(type) {
    switch(type) {
        case types.EMAIL:
            return types.EMAIL;
        case types.PASSWORD:
            return types.PASSWORD;
        case types.PHONENUMBER:
            return types.PHONENUMBER;
        case types.SEARCH:
            return types.SEARCH;
        case types.URL:
            return types.URL;
        default:
            return types.TEXT;
    }
}

const types = {
    URL: 'url',
    PASSWORD: 'password',
    EMAIL: 'email',
    TEXT: 'text',
    SEARCH: 'search',
    PHONENUMBER: 'tel'

}
