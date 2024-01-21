import {useState} from 'react';

import {Form, InputField} from "@components";
import {useForm} from '../data/useForm.jsx';
import {OnderzoekAanmaken} from "@pages/research/create/request/OnderzoekAanmaken.jsx";
import {useAuth} from "@hooks";
import {useNavigate} from "react-router-dom";


function OnderzoekStapTwee() {
    const {state, nextStep} = useForm();
    const {userInfo} = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [move, setMove] = useState("moveIn");
    const [values, setValues] = useState({
        aantalParticipanten: 0,
        vergoeding: 0,
        datum: '',
        websiteUrl: 'https://',
        plaats: '',
    });

    function NaarOnderzoeken() {
        navigate("/");
    }

    function handleChange({element, value, id}) {
        setValues({...values, [id ? id : element.id]: value});
        console.log(values)
    }

    async function handleSubmit(formData) {
        const {values} = formData;
        const { valid, message } = validateForm(values);
        if (!valid) {
            setMessage(message);
            return;
        }


        setMove("moveOut");

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const updatedOnderzoek = {...state.onderzoek, ...values};


            const aangemaaktOnderzoek = await OnderzoekAanmaken(updatedOnderzoek, userInfo);

            setTimeout(() => {
                if (updatedOnderzoek.type === "websiteBezoek") {
                    NaarOnderzoeken();
                } else {
                    state.onderzoek = {...state.onderzoek, ...aangemaaktOnderzoek};
                    nextStep();
                }
            }, 1000);

        } catch (error) {
            console.error("Error in handleSubmit:", error);

        }
    }


    return (
        <div>
            <Form title="Onderzoek aanmaken" buttonText='volgende' onSubmit={handleSubmit} className={move}>
                <InputField id='aantalParticipanten' type="number" value={values.aantalParticipanten} onChange={handleChange}
                            required>Aantal Participanten</InputField>
                <InputField id='vergoeding' type="number" value={values.vergoeding} onChange={handleChange}
                            required>Vergoeding</InputField>
                <InputField id='datum' type='date' value={values.datum} onChange={handleChange} required>Datum</InputField>
                <InputField id='websiteUrl'   pattern={"^(https?|ftp):\\/\\/[^\\s\\/$.?#].[^\\s]*$"} value={values.websiteUrl} onChange={handleChange}
                            required>WebsiteUrl</InputField>
                <InputField id='plaats' value={values.plaats} onChange={handleChange} required>Plaats</InputField>
            </Form>
        </div>
    );
}


export default OnderzoekStapTwee;

function validateForm(formData) {
    const { websiteUrl } = formData;
    const regex =
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    return { valid: regex.test(websiteUrl), message: "Website url is ongeldig." };
}
