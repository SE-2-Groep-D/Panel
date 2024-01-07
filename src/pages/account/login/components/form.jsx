import { useState } from "react";
import { Form, InputField } from "@components";
import Cookies from "universal-cookie";

function LoginForm() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  function handleChange({ element, value, id }) {
    setNewUser({ ...newUser, [id ? id : element.id]: value });
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://localhost:5000/Auth/Login", {
        method: "POST",
        credentials: "include",
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

      saveCookie(data);
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

function saveCookie(user) {
  // const cookies = new Cookies();
  // cookies.set("access_token", user.jwtToken, {
  //   path: "/",
  //   httpOnly: true,
  //   secure: true,
  // });
  console.log("cookie set");
}

export default LoginForm;
