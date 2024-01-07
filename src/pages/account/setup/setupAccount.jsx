import "@pagestyles/setup-account.scss";

import { Logo, ProgressBar } from "@components";
import Form from "./form.jsx";
import { FormProvider } from "./data/formContext.jsx";
import { useForm } from "./data/useForm.jsx";

function SetupAccount() {
  return (
    <main id="setup-account">
      <Logo id="logo" />
      <FormProvider>
        <SetupAccountForm />
      </FormProvider>
    </main>
  );
}

function SetupAccountForm() {
  const { state } = useForm();

  return (
    <>
      <ProgressBar step={state.currentStep} maxStep={state.maxStep} />
      <Form />
    </>
  );
}

export default SetupAccount;
