import React, {useState} from 'react';

import {Form, Button, Logo, ProgressBar, InputField, OptionSelector, Checkbox, MultiInputSelector} from "@components";
import {default as useFormData } from '../hooks/useFormData.jsx'

function OnderzoekForm() {
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
            <Form title="Onderzoek" buttonText='volgende' message={message} onSubmit={handleSubmit} move={move}>
                <InputField id='postcode' visible required >Postcode</InputField>
                <OptionSelector id='leeftijd' options={['jonger dan 18', '18 t/m 30', '31 t/m 40', '41 t/m 50', '51 t/m 60', '61 t/m 70', '71 t/m 80', '81 t/m 90', '91 t/m 100', 'boven de 100']} visible required >Leeftijd</OptionSelector>
                <MultiInputSelector animation={false}>Type beperking</MultiInputSelector>
                <MultiInputSelector animation={false}>Hulpmiddelen</MultiInputSelector>
                <Checkbox id='toestemmingBenadering' visible required >Ik mag benaderd worden door bedrijven</Checkbox>
            </Form>
        </div>
    );
}

export default OnderzoekForm;