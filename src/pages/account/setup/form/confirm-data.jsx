import { Button, Form, LoadingDiv } from "@components";
import { useForm } from "../data/useForm.jsx";
import "@pagestyles/account/_confirm-data.scss";
import { registerErvaringsdeskundige } from "../postRequests/registerErvaringsdeskundige.js";
import { registerBedrijf } from "../postRequests/registerBedrijf.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonCircleCheck} from "@fortawesome/free-solid-svg-icons";

function ConfirmData() {
  const { state } = useForm();
  const [isRegisterd, setIsRegisterd] = useState(0);
  const navigate = useNavigate();

  async function handleSubmit() {
    setIsRegisterd(1);
    if (state.user.userType === "Ervaringsdeskundige") {
      const result = await registerErvaringsdeskundige(state.user);
      result ? setIsRegisterd(2) : setIsRegisterd(3);
    } else if (state.user.userType === "Bedrijf") {
      const result = await registerBedrijf({ ...state.user, ...state.company });
      result ? setIsRegisterd(2) : setIsRegisterd(3);
    }
  }
  return (
    <>
      {isRegisterd === 0 && (
        <Form
          title={"Klopt deze informatie"}
          buttonText="Maak account"
          onSubmit={handleSubmit}
        >
          <UserInfo user={state} />
        </Form>
      )}
      {isRegisterd === 1 && <LoadingDiv loading={true} />}
      {isRegisterd === 2 && (
        <>
          <FontAwesomeIcon icon={faPersonCircleCheck} className='person-icon'/>
          <h1>U bent geregistreerd, U kunt nu inloggen</h1>
          <Button onClick={naarLogin}>Naar inloggen</Button>
        </>
      )}
      {isRegisterd === 3 && (
        <>
          <h1>Er is iets mis gegaan, probeer het later nog een keer</h1>
          <Button onClick={naarRegister}>Naar registreren</Button>
        </>
      )}
    </>
  );

  function naarLogin() {
    navigate("/login");
  }

  function naarRegister() {
    navigate("/register");
  }
}

function UserInfo(state) {
  const user = state.user.user;
  const company = state.user.company;
  if (user.userType === "Ervaringsdeskundige") {
    return (
      <>
        <p>
          <b>Voornaam:</b> {user.firstName}
        </p>
        <p>
          <b>Achternaam</b>: {user.lastName}
        </p>
        <p>
          <b>Telefoonnummer</b>: {user.phoneNumber}
        </p>
        <p>
          <b>Email</b>: {user.email}
        </p>
        <p>
          <b>Postcode</b>: {user.postcode}
        </p>
        <p>
          <b>Leeftijdsgroep</b>: {user.ageGroup}
        </p>
        <p>
          <b>Hulpmiddelen</b>: {user.tools}
        </p>
        <p>
          <b>Voorkeurbenaderingen</b>: {user.preferredApproach}
        </p>
      </>
    );
  } else if (user.userType === "Bedrijf") {
    return (
      <>
        <p>
          <b>Email</b>: {user.email}
        </p>
        <p>
          <b>Bedrijfsnaam</b>: {company.name}
        </p>
        <p>
          <b>Postcode</b>: {company.postcode}
        </p>
        <p>
          <b>Plaats</b>: {company.place}
        </p>
        <p>
          <b>Straat</b>: {company.street}
        </p>
        <p>
          <b>Nummer</b>: {company.number}
        </p>
        <p>
          <b>Website</b>: {company.websiteUrl}
        </p>
        <p>
          <b>Omschrijving</b>: {company.description}
        </p>
      </>
    );
  } else {
    console.log(state);
    console.log(user.user.userType);
    return <p>user type bedrijf is er niet</p>;
  }
}

export default ConfirmData;
