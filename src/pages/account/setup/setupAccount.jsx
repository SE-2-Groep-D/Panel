import "@pagestyles/account/_setup-account.scss";

import { Logo, ProgressBar } from "@components";
import Form from "./form.jsx";
import { FormProvider } from "./data/formContext.jsx";
import { useForm } from "./data/useForm.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";


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
    const navigate = useNavigate();
  const { state } = useForm();

  if(!state.user || !state.user.password) {
      navigate("/register");
      return;
  }

  return (
    <>
      <ProgressBar step={state.currentStep} maxStep={state.maxStep} />
      <BackButton/>
      <Form />
    </>
  );
}

function BackButton() {
    const {state, prevStep} = useForm();

    if(state.currentStep === 0) {
        return null;
    }

    return <button className='back' onClick={prevStep}>
        <FontAwesomeIcon icon={faChevronLeft} />
        Terug
    </button>
}

export default SetupAccount;
