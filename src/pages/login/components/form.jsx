import { useState } from "react";
import { Form, InputField } from "@components";

function LoginForm() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });

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

      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log(data);
        } else {
          console.log("No data");
        }
      } else if (response.status === 400) {
        const data = await response.text();
        if (data) {
          console.log(data);
        } else {
          console.log("No data");
        }
      } else {
        console.log("Login failed.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Form title="Inloggen" buttonText="Inloggen" onSubmit={handleSubmit}>
      <InputField
        id="email"
        visible
        required
        value={newUser.email}
        onChange={(e) =>
          setNewUser({ email: e.target.value, password: newUser.password })
        }
      >
        Email
      </InputField>
      <InputField
        id="password"
        type="password"
        visible
        required
        value={newUser.password}
        onChange={(e) =>
          setNewUser({ email: newUser.email, password: e.target.value })
        }
      >
        Wachtwoord
      </InputField>
    </Form>
  );
}

export default LoginForm;
