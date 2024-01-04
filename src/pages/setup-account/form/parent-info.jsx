import {useState} from 'react';

import {Form, InputField} from "@components";
import {useForm} from '../data/useForm.jsx';

function StartForm() {
    const {state, nextStep, prevStep } = useForm();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState('moveIn');
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        phoneNumber: '+31',
    });

    function handleChange({element, value, id}) {
        setValues({...values, [(id) ? id : element.id] : value});
    }


    function handleSubmit(formData) {
        const {values} = formData;
        const {valid, message} = validateForm(values, state.user);
        const {name, email, phoneNumber} = values;
  
        if(!valid) {
            setMessage(message);
            return;
        }
        state.user.parent = {...state.user.parent, name, email, phoneNumber}
        nextStep();
    }

    return (
        <div>
            <Form title="Voogd Informatie" buttonText='volgende' message={message} onSubmit={handleSubmit} move={move}>
                <InputField id='name' value={values.name} onChange={handleChange} required>Uw volledige naam</InputField>
                <InputField id='email' value={values.email} onChange={handleChange} required>email</InputField>
                <InputField id='phoneNumber' value={values.phoneNumber} onChange={handleChange} required>Telefoonnummer</InputField>
            </Form>
        </div>
    );
}


export default StartForm;

function validateForm(formData, user) {
    const {phoneNumber, email} = formData;


    const regex = /^(?:\+31|0)(?:[1-9][0-9]?|6[1-6]|7[0-9]|8[1-5]|9[0-9])\d{6,7}$/;
    if(!regex.test(phoneNumber)) 
        return {valid: false, message: 'Telefoonnummer is ongeldig.'};

    if(validateUser(user) && user.email === email)
        return {valid: false, message: 'Email van de voogd moet anders zijn dan die van de gebruiker.'}; 


    return {valid: true, message: null};
}

function validateUser(user) {
    return user !== null && user !== undefined && user.userType !== null && user.userType !== undefined;
}