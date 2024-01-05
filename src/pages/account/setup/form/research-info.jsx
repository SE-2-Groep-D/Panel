import {useState} from 'react';

import {Form, InputField, OptionSelector, MultiInputSelector, Checkbox} from "@components";
import {useForm} from '../data/useForm.jsx';

function StartForm() {
    const {state, nextStep } = useForm();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState('moveIn');
    
    const [values, setValues] = useState({
        postcode: '',
        disabillityTypes: [],
        preferredApproach: 'Email',
        canBeApproached: true,
    });

    function handleChange({element, value, id}) {
        setValues({...values, [(id) ? id : element.id] : value});
    }


    function handleSubmit(formData) {
        const {values} = formData;
        const {valid, message} = validateForm(values);
        const {postcode, disabillityTypes, preferredApproach, canBeApproached} = values;
  
        if(!valid) {
            setMessage(message);
            return;
        }

        setMove('moveOut')
        setTimeout(() => {
            state.user = {...state.user, postcode, disabillityTypes, preferredApproach, canBeApproached};
            nextStep();
        }, 500)

    }

    return (
        <div>
            <Form title="Onderzoek Informatie" buttonText='volgende' message={message} onSubmit={handleSubmit} className={move}>
                <InputField id='postcode' pattern={'^\\d{4}\\s?[a-zA-Z]{2}$'} value={values.postcode} onChange={handleChange} required>Postcode</InputField>
                <MultiInputSelector id='disabillityTypes' value={values.disabillityTypes} onChange={handleChange}>Type beperkingen</MultiInputSelector>
                <OptionSelector id='preferredApproach' value={values.preferredApproach} onChange={handleChange} options={['Email', 'Telefoon']} required>Benader mij via</OptionSelector>
                <Checkbox id='canBeApproached' value={values.canBeApproached} onChange={handleChange} required checked>Ik mag benaderd worden door bedrijven.</Checkbox>
            </Form>
        </div>
    );
}


export default StartForm;

function validateForm(formData) {
    console.log(formData);

    return {valid: true, message: null};
}
