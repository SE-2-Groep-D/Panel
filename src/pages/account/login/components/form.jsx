import { useState } from "react";
import { Form, InputField, LoadingDiv } from "@components";
import { useNavigate } from "react-router";
import {useAuth} from "@hooks";
import {ApiResponseError, fetchApi} from "@api";

function LoginForm() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });
  const [isIngelogd, setIsIngelogd] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  function handleChange({ element, value, id }) {
    setNewUser({ ...newUser, [id ? id : element.id]: value });
  }

  const handleSubmit = async () => {
    try {
      const response = await fetchApi("/Auth/Login", "POST", {
        email: newUser.email,
        password: newUser.password,
      });

      setIsIngelogd(true);
      navigate("/");
      loginUser(response.userId, response);
    } catch (error) {
      if(!(error instanceof ApiResponseError)) {
        console.error(error.message);
        return;
      }

      const {status} = error.response;

      switch (status) {
        case 404:
          setMessage('Gebruiker niet gevonden.');
          break;

        case 400:
          setMessage('Het email of wachtwoord is onjuist.');
          break;

        default:
          setMessage('Er is een fout ontstaan, probeer het later opnieuw.');
          break;
      }

      if(status === 500) {
        setMessage('Kon niet verbinden met de server, probeer het later opnieuw.');
        console.log(error.response);
        return;
      }

    }
  };

  return (
    <>
      {!isIngelogd && (
        <Form title="Inloggen" buttonText="Inloggen" onSubmit={handleSubmit} message={message}>
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
    </>
  );
}

export default LoginForm;
