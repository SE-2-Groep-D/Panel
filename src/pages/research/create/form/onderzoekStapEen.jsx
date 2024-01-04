import {useState} from 'react';

import {Form, InputField, OptionSelector, Checkbox} from "@components";
import {useForm} from '../data/useForm.jsx';

function StartForm() {
    const {state, nextStep, prevStep } = useForm();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState('moveIn');

    const [values, setValues] = useState({
        titel: '',
        omschrijving: '',
        typeOnderzoek: '',
        status: '',
    });

    function handleChange({element, value, id}) {
        setValues({...values, [(id) ? id : element.id] : value});
    }

    function handleSubmit(formData) {
        const {values} = formData;


        state.onderzoek = values;

        nextStep();
    }

    return (
        <div>
            <Form title="Account Informatie" buttonText='volgende'  onSubmit={handleSubmit} move={move}>
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

