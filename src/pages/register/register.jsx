import '@pagestyles/register.scss';
import {Form, Button, Logo, ProgressBar, InputField, OptionSelector, Checkbox, MultiInputSelector} from "@components";

function Register() {
    

  return (
        <section id="register">
            <Logo id="logo"></Logo>
            <Form title="Registreren" buttonText="Registreren">
                <InputField id='email' visible required>Email</InputField>
                <InputField id='password' type='password' visible required>Wachtwoord</InputField>
                <Checkbox id='privacy' visible required>Acepteer privacy verklaring</Checkbox>
            </Form>
            <Button color='tertiary' varient='text'>Sign in with Google</Button>
        </section>
  );
}

export default Register;