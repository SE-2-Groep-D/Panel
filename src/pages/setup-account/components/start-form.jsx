import React, {useState} from 'react';

import {Form, Button, Logo, ProgressBar, InputField, OptionSelector} from "@components";
import {default as useFormData } from '../hooks/useFormData.jsx'

function StartForm() {
    const {formData, dispatch} = useFormData();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState('moveIn');
    const handleSubmit = (data) => {
        const userData = {...formData.user, ...data.values};
        setMove('moveOut');
        formData.user = userData;
        setTimeout(() => {
            dispatch({type: 'NEXT_STAGE', user: userData});

            console.log(formData)
        }, 300)
    };

    return (
        <div>
            <Form title="Account" buttonText='volgende' message={message} onSubmit={handleSubmit} move={move}>
                <InputField id='firstName' visible required >Voornaam</InputField>
                <InputField id='lastName' visible required >Achternaam</InputField>
                <InputField id='phonenumber'  type='tel' visible required>Telefoonnummer</InputField>
                <OptionSelector id='account-type' options={['Ervaringsdeskundige', 'Bedrijf']} required>Ik ben een</OptionSelector>
            </Form>
        </div>
    );
}

export default StartForm;