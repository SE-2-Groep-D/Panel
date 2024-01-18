import { Logo, GoogleButton } from "@components";
import "@pagestyles/account/_loginRegister.scss";
import RegisterForm from "./components/form";
import { FormProvider } from "../setup/data/formContext";

function Register() {
  return (
    <FormProvider>
      <header className="headerRegister">
        <Logo id="logo"></Logo>
      </header>
      <main className={"registerForm"}>
        <RegisterForm />
      </main>
      <footer className="other">
        <hr />
        <GoogleButton />
        <a href="./login">Toch inloggen?</a>
      </footer>
    </FormProvider>
  );
}

export default Register;
