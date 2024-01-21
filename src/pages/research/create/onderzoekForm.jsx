import '@pagestyles/research/onderzoekAanmaken.scss';
import { FormProvider } from './data/formContext.jsx';
import { useForm } from './data/useForm.jsx';
import { Logo, ProgressBar } from "@components";
import Form from './form.jsx';

function Onderzoek() {
    return (
        <FormProvider>
            <OnderzoekContent />
        </FormProvider>
    );
}

function OnderzoekContent() {
    const { state } = useForm();

    let mainId = state.currentStep > 1 ? 'vragenlijst' : 'onderzoekAanmaken';
    return (
        <main id={mainId}>
            <OnderzoekForm />
        </main>
    );
}

function OnderzoekForm() {
    const { state } = useForm();

    return (
        <>
            {state.currentStep <= 1 && <ProgressBar step={state.currentStep} maxStep={state.maxStep} />}
            <Form />
        </>
    );
}

export default Onderzoek;
