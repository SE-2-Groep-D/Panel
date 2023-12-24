import '@pagestyles/setup-account.scss';

import {Logo, ProgressBar, LoadingDiv} from "@components";
import Form from './form.jsx';

import useMultiStepForm from './hooks/useMultiStepForm.jsx';

function SetupAccount() {
  const {data, nextStep, prevStep} = useMultiStepForm();
  const {currentStage, maxStage} = data;

  console.log(data);

  return <main id='setup-account'>
          <Logo id="logo" />
          <ProgressBar stage={currentStage} maxStage={maxStage}/>
          <Form data={data}/>
  </main>
}



export default SetupAccount;