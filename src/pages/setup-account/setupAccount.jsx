import '@pagestyles/setup-account.scss';

import Form from './form.jsx';
import { FormProvider } from './context/formcontext';

function SetupAccount() {
  return (
    <FormProvider >
        <section id="setup-account">
            <Form />
        </section>
    </FormProvider>
  );
}

export default SetupAccount;