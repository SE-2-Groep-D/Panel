// eslint-disable-next-line react/prop-types
export default function InputField({children, type, name, message, required, disabled, visible, onChange}) {
    name = (name == undefined || name == null) ? "field" : name;

    const inputField = (required)? 
        <input id={name} type={getInputType(type)} placeholder={children} onChange={onChange} required></input> :
        <input id={name} type={getInputType(type)} placeholder={children} onChange={onChange}></input>

    if(required) message = 'required*';
  return (
    <div className={(visible) ? 'input-field visible' : 'input-field'}>
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
