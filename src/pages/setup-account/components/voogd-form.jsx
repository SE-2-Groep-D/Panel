import React, {useState} from 'react';

import {Form, Button, Logo, ProgressBar, InputField, OptionSelector} from "@components";
import {default as useFormData } from '../hooks/useFormData.jsx'

function VoogdForm() {
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
            <Form title="Voogd Informatie" buttonText='volgende' message={message} onSubmit={handleSubmit} move={move}>
                <InputField id='nameVoogd' visible required >Naam</InputField>
                <InputField id='emailVoogd' type='email' visible required >Email</InputField>
                <InputField id='phonenumberVoogd' type='tel' visible required>Telefoonnummer</InputField>
            </Form>
        </div>
    );
}

export default VoogdForm;