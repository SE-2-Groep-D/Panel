import "@pagestyles/register.scss";
import { Logo } from "@components";
import RegisterForm from "./components/form";
import GoogleButton from "./components/GoogleButton";

function Register() {
  return (
    <section id="register">
      <Logo id="logo"></Logo>
      <RegisterForm />
      <div className='other'>
          <hr />
          <GoogleButton />
          <a href="./login">Toch inloggen?</a>
      </div>
    </section>
  );
}

export default Register;
