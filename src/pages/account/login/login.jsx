import "@pagestyles/account/_register.scss";

import { Logo, LoadingDiv, GoogleButton } from "@components";
import LoginForm from "./components/form";
//import GoogleButton from "./components/GoogleButton";
import { FormProvider } from "../setup/data/formContext";
function Login() {
  return (
    <FormProvider>
      <section id="register">
        <Logo id="logo"></Logo>
        <LoginForm />
        <div className="other">
          <hr />
          <a href="">Wachtwoord vergeten?</a>
          <GoogleButton />
          <a href="./register">Nog geen account?</a>
        </div>
      </section>
    </FormProvider>
  );
}

export default Login;
