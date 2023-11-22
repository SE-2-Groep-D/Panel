import React from 'react'

export default function InputField({children, type, name, message, required}) {
    name = (name == undefined || name == null) ? "input-field" : name;

    const inputField = (required)? 
        <input name={name} type={getInputType(type)} placeholder={children} required></input> :
        <input name={name} type={getInputType(type)} placeholder={children}></input>

    if(required) message = 'required*';
  return (
    <div className='input-field'>
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
