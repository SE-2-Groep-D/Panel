import {useState} from 'react';

import {Form, Button, Logo, ProgressBar, InputField, OptionSelector} from "@components";
import useMultiStepForm from '../hooks/useMultiStepForm';

function StartForm() {
    const {data, nextStep, prevStep } = useMultiStepForm();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState('moveIn');
    


    function handleSubmit(formData) {
        const {valid, message} = validateForm(formData);

        if(!valid) {
            setMessage(message);
            return;
        }

        nextStep();
    }

    return (
        <div>
            <Form title="Account Informatie" buttonText='volgende' message={message} onSubmit={handleSubmit} move={move}>
                <InputField id='name' visible required>Naam</InputField>
                <InputField id='phoneNumber' type='tel' visible required message='verplicht'>Telefoonnummer</InputField>
                <OptionSelector id='accountType' options={['Ervaringsdeskundige', 'Bedrijf']} required>Ik ben een</OptionSelector>
            </Form>
        </div>
    );
}


export default StartForm;

function validateForm(formData) {
    const phoneNumber = formData.phoneNumber;
    const regex = /^(?:\+31|0)(?:[1-9][0-9]?|6[1-6]|7[0-9]|8[1-5]|9[0-9])\d{6,7}$/;
    return {valid: regex.test(phoneNumber), message: 'Telefoonnummer is ongeldig.'}
}