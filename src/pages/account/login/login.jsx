import "@pagestyles/account/_register.scss";

import { Logo, LoadingDiv } from "@components";
import LoginForm from "./components/form";
import GoogleButton from "./components/GoogleButton";

function Login() {
  return (
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
  );
}

export default Login;
