import {useState} from 'react';

import {Form, InputField} from "@components";
import {useForm} from '../data/useForm.jsx';

function StartForm() {
    const {state, nextStep, prevStep } = useForm();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState('moveIn');
    

    const [values, setValues] = useState({
        name: '',
        description: '',
        websiteUrl: 'https://',
    });

    function handleChange({element, value, id}) {
        setValues({...values, [(id) ? id : element.id] : value});
    }
    


    function handleSubmit(formData) {
        const {values} = formData;
        const {valid, message} = validateForm(values);
        const {name, description, websiteUrl} = values;

        if(!valid) {
            setMessage(message);
            return;
        }

        state.company = {name, description, websiteUrl}
        nextStep();
    }

    return (
        <div>
            <Form title="Bedrijf Informatie" buttonText='volgende' message={message} onSubmit={handleSubmit} move={move}>
                <InputField id='name' value={values.name} onChange={handleChange} required>Naam</InputField>
                <InputField id='description' value={values.description} onChange={handleChange} required size='big'>Omschrijving</InputField>
                <InputField id='websiteUrl' value={values.websiteUrl} onChange={handleChange} required>Website url</InputField>
            </Form>
        </div>
    );
}


export default StartForm;

function validateForm(formData) {
    const {websiteUrl} = formData;
    const regex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    return {valid: regex.test(websiteUrl), message: 'Website url is ongeldig.'}
}