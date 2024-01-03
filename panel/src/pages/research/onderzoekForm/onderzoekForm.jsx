import '@pagestyles/setup-account.scss';

import {Logo, ProgressBar, LoadingDiv} from "@components";
import Form from './form.jsx';
import { FormProvider } from './data/formContext.jsx';
import { useForm } from './data/useForm.jsx';


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