import {useState} from 'react';

import {Form, InputField} from "@components";
import {useForm} from '../data/useForm.jsx';

function StartForm() {
    const {state, nextStep, prevStep } = useForm();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState('moveIn');
    

    const [values, setValues] = useState({
        place: '',
        postcode: '',
        street: '',
        number: '',
    });

    function handleChange({element, value, id}) {
        setValues({...values, [(id) ? id : element.id] : value});
    }
    


    function handleSubmit(formData) {
        const {values} = formData;
        const {valid, message} = validateForm(values);
        const {place, postcode,street, number} = values;

        if(!valid) {
            setMessage(message);
            return;
        }
        
        state.company = {...state.company, place, postcode, street, number}
        nextStep();
    }

    return (
        <div>
            <Form title="Bedrijf Informatie" buttonText='volgende' message={message} onSubmit={handleSubmit} className={move}>
                <InputField id='place' value={values.place} onChange={handleChange} required>Plaats</InputField>
                <InputField id='postcode' value={values.postcode} onChange={handleChange} required>Postcode</InputField>
                <InputField id='street' value={values.street} onChange={handleChange} required>Straat</InputField>
                <InputField id='number' value={values.number} onChange={handleChange} required>Huisnummer</InputField>
            </Form>
        </div>
    );
}


export default StartForm;

function validateForm(formData) {
    const {postcode} = formData;
    const regex = /^\d{4}\s?[a-zA-Z]{2}$/;
    return {valid: regex.test(postcode), message: 'Voer een geldige postcode in.'}
}