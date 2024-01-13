import "@pagestyles/account/_confirm-data.scss";

import { useNavigate } from "react-router-dom";
import { useForm } from "../data/useForm.jsx";
import { useState } from "react";

import { Button, Form, LoadingDiv } from "@components";
import { registerErvaringsdeskundige } from "../postRequests/registerErvaringsdeskundige.js";
import { registerBedrijf } from "../postRequests/registerBedrijf.js";

import {faPersonCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



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
    <div className='confirm-data'>
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
    </div>
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
      <ul className='user-info'>
          <li>
              <span>Voornaam:</span> {user.firstName}
          </li>

          <li>
              <span>Achternaam:</span> {user.lastName}
          </li>

          <li>
              <span>Telefoonnummer:</span> {user.phoneNumber}
          </li>

          <li>
              <span>Email:</span> {user.email}
          </li>

          <li>
              <span>Postcode:</span> {user.postcode}
          </li>

          <li>
              <span>Leeftijdsgroep:</span> {user.ageGroup}
          </li>

          <li>
              <span>Hulpmiddelen:</span> {user.tools}
          </li>

          <li>
              <span>Voorkeurbenaderingen:</span> {user.preferredApproach}
          </li>
      </ul>
    );
  } else if (user.userType === "Bedrijf") {
    return (
      <ul className='user-info'>
          <li>
              <span>Email:</span> {user.email}
          </li>

          <li>
              <span>Bedrijfsnaam:</span> {company.name}
          </li>

          <li>
              <span>Omschrijving:</span> {company.description}
          </li>

          <li>
              <span>Postcode:</span> {company.postcode}
          </li>

          <li>
              <span>Plaats:</span> {company.place}
          </li>

          <li>
              <span>Straat:</span> {company.street}
          </li>

          <li>
              <span>Nummer:</span> {company.number}
          </li>

          <li>
              <span>Website:</span> {company.websiteUrl}
          </li>
      </ul>
    );
  } else {
    console.log(state);
    console.log(user.user.userType);
    return <p>user type bedrijf is er niet</p>;
  }
}

export default ConfirmData;
