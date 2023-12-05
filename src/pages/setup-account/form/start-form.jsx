import {useState} from 'react';

import {Form, Button, Logo, ProgressBar, InputField, OptionSelector} from "@components";
import {default as useFormData } from '../hooks/useFormData.jsx'

function StartForm() {
    const {formData, dispatch} = useFormData();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState('moveIn');
    
    const handleSubmit = (data) => {
        const userData = {...formData.user, ...data.values};
        setMove('moveOut');
        setTimeout(() => {
            dispatch({type: 'NEXT_STAGE', user: userData});
        }, 300)
    };

    return (
        <div>
            <Form title="Account" buttonText='volgende' message={message} onSubmit={handleSubmit} move={move}>
                <InputField id='name' visible required>Naam</InputField>
                <InputField id='phonenumber' type='tel' visible required message='verplicht'>Telefoonnummer</InputField>
                <OptionSelector id='accountType' options={['Ervaringsdeskundige', 'Bedrijf']} required>Ik ben een</OptionSelector>
            </Form>
        </div>
    );
}

export default StartForm;