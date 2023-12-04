// eslint-disable-next-line react/prop-types
import {useState} from "react";

export default function InputField({children, type, name, id, message, required, disabled, visible, onChange}) {
    name = (name === undefined || name === null) ? "field" : name;
    const [value, setValue] = useState('');

    const inputField = (required)? 
        <input id={name} type={getInputType(type)} placeholder={children} onChange={handleChange} required></input> :
        <input id={name} type={getInputType(type)} placeholder={children} onChange={handleChange}></input>

    function handleChange(e) {
        if(onChange !== undefined && onChange !== null) onChange({
            element: e.target.parentNode,
            oldValue: value,
            value: e.target.value,
        })
        setValue(e.target.value);
    }

    if(required && message === null || message === undefined) message = 'required*';
  return (
    <div className={(visible) ? 'inputField visible' : 'inputField'} value={value} id={id}>
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
