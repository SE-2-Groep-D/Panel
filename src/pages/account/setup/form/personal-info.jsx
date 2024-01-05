import {useState} from 'react';

import {Form, InputField, OptionSelector} from "@components";
import {useForm} from '../data/useForm.jsx';

function StartForm() {
    const {state, nextStep, prevStep } = useForm();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState('moveIn');

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        ageGroup: 'leeftijdsgroep',
    });

    function handleChange({element, value, id}) {

        setValues({...values, [(id) ? id : element.id] : value});
    }
    

    function handleSubmit(formData) {
        const {firstName, lastName, ageGroup} = formData.values;

        if(ageGroup === 'leeftijdsgroep') {
            setMessage('Kies een leeftijdsgroep.');
            return;
        }

        setMove('moveOut')
        setTimeout(() => {
            state.user = {...state.user, firstName, lastName, ageGroup};
            if(ageGroup === '0 tot 10' || ageGroup === '10 tot 18') state.maxStep++;
            nextStep();
            nextStep();
        }, 500)
    }

    return (
        <div>
            <Form title="Persoonlijke Informatie" buttonText='volgende' message={message} onSubmit={handleSubmit} className={move}>
                <InputField id='firstName' value={values.firstName} onChange={handleChange} required>Voornaam</InputField>
                <InputField id='lastName' value={values.lastName} onChange={handleChange} required>Achternaam</InputField>
                <OptionSelector id='ageGroup'  
                    options={['0 tot 10', '10 tot 18', '18 tot 35', '35 tot 50', '50 tot 65', '65 of ouder']} 
                    value={values.ageGroup} onChange={handleChange}
                    required>
                    Mijn leeftijds groep is
                    </OptionSelector>
            </Form>
        </div>
    );
}


export default StartForm;