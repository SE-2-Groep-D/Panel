import { useState } from "react";
import { Form, InputField, Checkbox } from "@components";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  function handleChange({ element, value, id }) {
    setNewUser({ ...newUser, [id ? id : element.id]: value });
  }

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch("/api/Auth/Register", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         voornaam: "string",
  //         achternaam: "string",
  //         googleAccount: false,
  //         email: newUser.email,
  //         password: newUser.password,
  //         roles: ["Beheerder"],
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.text();
  //       if (data) {
  //         console.log(data);
  //       } else {
  //         console.log("Message missing in the response.");
  //       }
  //     } else {
  //       console.log("Register failed.");
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleSubmit = () => {
    navigate("/setupAccount", { state: { ...newUser } });
  };

  return (
    <Form title="Registreren" buttonText="Registreren" onSubmit={handleSubmit}>
      <InputField
        id="email"
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
      <Checkbox id="privacy" visible required>
        Acepteer privacy verklaring
      </Checkbox>
    </Form>
  );
}

export default RegisterForm;
