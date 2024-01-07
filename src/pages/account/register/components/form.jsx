import { useState } from "react";
import { Form, InputField, Checkbox, ToolTip } from "@components";
import {Link, useNavigate } from "react-router-dom";

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
      <ToolTip  
        position="bottom"
        message={
          "Het wachtwoord moet voldoen aan de volgende criteria:" + "\n" + 
          "\n- Minimaal 1 hoofdletter." +
          "\n- Minimaal 5 karakters lang." +
          "\n- Minimaal 1 cijfer." 
        }>
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
      </ToolTip>
      <Checkbox id="privacy" visible required>
        <Link to="/privacy">Acepteer privacy verklaring</Link>
      </Checkbox>
    </Form>
  );
}

export default RegisterForm;
