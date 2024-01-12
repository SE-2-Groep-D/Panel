import "@pagestyles/account/_register.scss";
import { Logo } from "@components";
import RegisterForm from "./components/form";
import GoogleButton from "./components/GoogleButton";
import { FormProvider } from "../setup/data/formContext";

function Register() {
  return (
    <FormProvider>
      <section id="register">
        <Logo id="logo"></Logo>
        <RegisterForm />
        <div className="other">
          <hr />
          <GoogleButton />
          <a href="./login">Toch inloggen?</a>
        </div>
      </section>
    </FormProvider>
  );
}

export default Register;
