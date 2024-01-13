import "@pagestyles/account/_loginRegister.scss";
import { Logo, LoadingDiv, GoogleButton } from "@components";
import LoginForm from "./components/form";
import { FormProvider } from "../setup/data/formContext";
function Login() {
  return (
    <FormProvider>
      <header>
        <Logo id="logo"></Logo>
      </header>
      <main>
        <LoginForm />
      </main>
      <footer className="other">
        <hr />
        <a href="">Wachtwoord vergeten?</a>
        <GoogleButton />
        <a href="./register">Nog geen account?</a>
      </footer>
    </FormProvider>
  );
}

export default Login;
