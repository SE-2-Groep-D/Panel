import {useState} from 'react';

import {Form, InputField} from "@components";
import {useForm} from '../data/useForm.jsx';

function OnderzoekStapTwee() {
    const {state, nextStep, prevStep } = useForm();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState('moveIn');


    const [values, setValues] = useState({
        aantalParticipanten: '',
        vergoeding: '',
        datum: '',
        websiteUrl: '',
    });

    function handleChange({element, value, id}) {
        setValues({...values, [(id) ? id : element.id] : value});
    }



    function handleSubmit(formData) {
        const {values} = formData;


        state.onderzoek = values;

    }

    return (
        <div>
            <Form title="OnderzoekInfo aanmaken" buttonText='volgende'  onSubmit={handleSubmit} move={move}>
                <InputField id='aantalParticipanten' value={values.aantalParticipanten} onChange={handleChange} required>Aantal Participanten</InputField>
                <InputField id='vergoeding' value={values.vergoeding} onChange={handleChange} required>Vergoeding</InputField>
                <InputField id='datum' value={values.datum} onChange={handleChange} required>Datum</InputField>
                <InputField id='websiteUrl' value={values.websiteUrl} onChange={handleChange} required>WebsiteUrl</InputField>
            </Form>
        </div>
    );
}


export default OnderzoekStapTwee;

