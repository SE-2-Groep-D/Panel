import '@pagestyles/account/_setup-account.scss';

// Import libraries
import { FormProvider } from './data/formContext.jsx';
import { useForm } from './data/useForm.jsx';

// Import components
import {Logo, ProgressBar} from "@components";
import Form from './form.jsx';



function Onderzoek() {
    return <main id='setup-account'>
        <Logo id="logo" />
        <FormProvider>
            <OnderzoekForm/>
        </FormProvider>
    </main>
}

function OnderzoekForm() {
    const {state} = useForm();
    return <>
        <ProgressBar step={state.currentStep} maxStep={state.maxStep}/>
        <Form />
    </>
}



export default Onderzoek;