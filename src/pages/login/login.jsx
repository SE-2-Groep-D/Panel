import "@pagestyles/register.scss";
import { Logo } from "@components";
import LoginForm from "./components/form";
import GoogleButton from "./components/GoogleButton";

function Login() {
  return (
    <section id="register">
      <Logo id="logo"></Logo>
      <LoginForm />
      <hr />
      <a href="">Wachtwoord vergeten?</a>
      <GoogleButton />
      <a href="./register">Nog geen account?</a>
    </section>
  );
}

export default Login;
