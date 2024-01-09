import "@pagestyles/register.scss";
import { fetchData } from "@api";
import { Logo, LoadingDiv } from "@components";
import LoginForm from "./components/form";
import GoogleButton from "./components/GoogleButton";
import { useAuth } from "@hooks";
import { useNavigate } from "react-router";
import { useEffect } from "react";
function Login() {
  const { authenticated, loginUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      (async () => {
        console.log(localStorage.getItem("auth"));
        if (localStorage.getItem("auth")) {
          const response = await fetchData("/Auth/Refresh");
          loginUser(response.userId, response);
          navigate("/");
          console.log("wel hier ook ingelogd:)");
        } else {
          console.log("niet ingelogd:)");
        }
      })();
    } catch {
      console.log("nog niet ingelogd");
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
    console.log("wordt gedaan");
  }, []);

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
