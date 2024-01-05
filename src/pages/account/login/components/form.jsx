import { useState } from "react";
import { Form, InputField } from "@components";

function LoginForm() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  function handleChange({ element, value, id }) {
    setNewUser({ ...newUser, [id ? id : element.id]: value });
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/Auth/Login", {
        method: "POST",
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let data = response.ok
        ? await response.json()
        : response.status === 400
        ? await response.text()
        : console.log("Login failed.");
      console.log(data || "No data");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
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
  );
}

export default LoginForm;
