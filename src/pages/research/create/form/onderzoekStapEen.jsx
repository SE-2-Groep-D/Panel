import {useState} from 'react';

import {Form, InputField, OptionSelector} from "@components";
import {useForm} from '../data/useForm.jsx';
import {useAuth} from "@hooks";

function StartForm() {
    const {state, nextStep} = useForm();
    const [move, setMove] = useState("moveIn");
    const [values, setValues] = useState({
        titel: '',
        omschrijving: '',
        type: ''
    });
    function handleChange({element, value, id}) {
        setValues({...values, [id ? id : element.id]: value});
        console.log(values)
    }

    function handleSubmit(formData) {
        const {values} = formData;
        setMove("moveOut");

        setTimeout(() => {
            state.onderzoek = {...state.onderzoek, ...values};

            nextStep();
        }, 500);

    }

    return (
        <div>
            <Form title="Onderzoek Aanmaken" buttonText='volgende' onSubmit={handleSubmit} className={move}>
                <InputField
                    id='titel'
                    type='text'
                    value={values.titel}
                    onChange={handleChange}
                    required>
                    Onderzoekstitel</InputField>

                <InputField
                    id='omschrijving'
                    type='text'
                    value={values.omschrijving}
                    onChange={handleChange}
                    required>
                    Omschrijving</InputField>

                <OptionSelector
                    id='type'
                    value={values.type}
                    onChange={handleChange}
                    options={['vragenlijst', 'websiteBezoek']}
                    required>
                    Wat voor onderzoek</OptionSelector>
            </Form>
        </div>
    );
}


export default StartForm;

