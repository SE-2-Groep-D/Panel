import { useState } from "react";
import { Form, InputField, LoadingDiv } from "@components";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import {useAuth} from "@hooks";
import { fetchApi } from "@api";

function LoginForm() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });
  const [isIngelogd, setIsIngelogd] = useState(false);
  const [gelukt, setGelukt] = useState(true);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  function handleChange({ element, value, id }) {
    setNewUser({ ...newUser, [id ? id : element.id]: value });
    setGelukt(true);
  }

  const handleSubmit = async () => {
    try {
      const response = await fetchApi("/Auth/Login", "POST", {
        email: newUser.email,
        password: newUser.password,
      });
      setIsIngelogd(true), navigate("/"), loginUser(response.userId, response);
    } catch (error) {
      console.error(error.message);
      setGelukt(false);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch("https://localhost:5000/Auth/Login", {
  //       method: "POST",
  //       credentials: "include",
  //       body: JSON.stringify({
  //         email: newUser.email,
  //         password: newUser.password,
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     });

  //     let data = response.ok
  //       ? await response.json()
  //       : response.status === 400
  //       ? await response.text()
  //       : console.log("Login failed.");
  //     console.log(data || "No data");

  //     response.ok
  //       ? (setIsIngelogd(true), navigate("/"), loginUser(data.userId, data))
  //       : setGelukt(false);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  return (
    <>
      {!isIngelogd && (
        <Form title="Inloggen" buttonText="Inloggen" onSubmit={handleSubmit}>
          <InputField
            id="email"
            type="email"
            visible
            required
            value={newUser.email}
            onChange={handleChange}
          >
            Email
          </InputField>
          <InputField
            id="password"
            type="password"
            visible
            required
            value={newUser.password}
            onChange={handleChange}
          >
            Wachtwoord
          </InputField>
        </Form>
      )}
      {isIngelogd && <LoadingDiv loading={true} />}
      {!gelukt && <p>Ongeldig email adres of wachtwoord</p>}
    </>
  );
}

export default LoginForm;
