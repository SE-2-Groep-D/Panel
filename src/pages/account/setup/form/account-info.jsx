import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, InputField, OptionSelector, Checkbox } from "@components";
import { useForm } from "../data/useForm.jsx";

function StartForm() {
  const { state, nextStep, prevStep } = useForm();
  const [message, setMessage] = useState(null);
  const [move, setMove] = useState("moveIn");
  const location = useLocation();

  const [values, setValues] = useState({
    email: (state.user && state.user.email) ? state.user.email : '',
    phoneNumber: (state.user && state.user.phoneNumber) ? state.user.phoneNumber : "+31",
    userType: (state.user && state.user.userType) ? state.user.userType : "Ervaringsdeskundige",
    acceptTerms: (state.user && state.user.acceptTerms) ? state.user.acceptTerms : false,
  });

  useEffect(() => {
    if (!location || !location.state) return;
    const { email, password } = location.state;
    if (email) values.email = location.state.email;
    if (password) values.password = location.state.password;
  });

  function handleChange({ element, value, id }) {
    setValues({ ...values, [id ? id : element.id]: value });
  }

  function handleSubmit(formData) {
    const { values } = formData;
    const { valid, message } = validateForm(values);

    if (!valid) {
      setMessage(message);
      return;
    }

    setMove("moveOut");

    setTimeout(() => {
      state.user = { ...state.user, ...values };
      nextStep();
    }, 500);
  }

  return (
    <div>
      <Form
        title="Account Informatie"
        buttonText="volgende"
        message={message}
        onSubmit={handleSubmit}
        className={move}
      >
        <InputField
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        >
          Email
        </InputField>

        <InputField
          id="phoneNumber"
          type="tel"
          value={values.phoneNumber}
          onChange={handleChange}
          required
          pattern={
            "^(?:\\+31|0)(?:[1-9][0-9]?|6[1-6]|7[0-9]|8[1-5]|9[0-9])\\d{6,7}$"
          }
        >
          Telefoonnummer
        </InputField>

        <OptionSelector
          id="userType"
          value={values.userType}
          onChange={handleChange}
          options={["Ervaringsdeskundige", "Bedrijf"]}
          required
        >
          Ik ben een
        </OptionSelector>

        <Checkbox
          id="acceptTerms"
          value={values.canBeApproached}
          onChange={handleChange}
          required
          checked
        >
          Ik ga akkoord met de algemene voorwaarden.
        </Checkbox>
      </Form>
    </div>
  );
}

export default StartForm;

function validateForm(formData) {
  if (formData.acceptTerms == false)
    return {
      valid: false,
      message: "U moet akkoord gaan met de algemene voorwaarden.",
    };

  const phoneNumber = formData.phoneNumber;
  const regex =
    /^(?:\+31|0)(?:[1-9][0-9]?|6[1-6]|7[0-9]|8[1-5]|9[0-9])\d{6,7}$/;
  return {
    valid: regex.test(phoneNumber),
    message: "Telefoonnummer is ongeldig.",
  };
}
