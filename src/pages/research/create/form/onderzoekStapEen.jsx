import {useState} from 'react';

import {Form, InputField, OptionSelector, Checkbox} from "@components";
import {useForm} from '../data/useForm.jsx';
import {useLocation} from "react-router-dom";

function StartForm() {
    const { state, nextStep, prevStep } = useForm();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState("moveIn");
    const location = useLocation();

    const [values, setValues] = useState({
        titel: '',
        omschrijving: '',
        typeOnderzoek: '',
        status: '',
    });

    function handleChange({ element, value, id }) {
        setValues({ ...values, [id ? id : element.id]: value });
    }

    function handleSubmit(formData) {
        const { values } = formData;

        setMove("moveOut");

        setTimeout(() => {
            state.onderzoek = { ...state.onderzoek, ...values };
            nextStep();
        }, 500);
    }

    return (
        <div>
            <Form title="Onderzoek Aanmaken" buttonText='volgende'  onSubmit={handleSubmit} move={move}>
                <InputField
                    id='onderzoekstitel'
                    type='text'
                    value={values.onderzoekstitel}
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
                    id='typeOnderzoek'
                    value={values.typeOnderzoek}
                    onChange={handleChange}
                    options={['Vragenlijst', 'Website bezoek']}
                    required>
                    Wat voor onderzoek</OptionSelector>
                <OptionSelector
                    id='status'
                    value={values.status}
                    onChange={handleChange}
                    options={['actief', 'dicht']}
                    required>
                    Status</OptionSelector>


            </Form>
        </div>
    );
}


export default StartForm;

function validateForm() {



}