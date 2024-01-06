import { useState } from "react";
import { Form, InputField, Checkbox } from "@components";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  function handleChange({ element, value, id }) {
    setNewUser({ ...newUser, [id ? id : element.id]: value });
  }

  const handleSubmit = () => {
    navigate("/setup", { state: { ...newUser } });
  };

  return (
    <Form title="Registreren" buttonText="Registreren" onSubmit={handleSubmit}>
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
        pattern={"^(?=.*\\d)(?=.*[A-Z]).{5,}$"}
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