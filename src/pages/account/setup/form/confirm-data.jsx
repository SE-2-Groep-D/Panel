import { Button, Form } from "@components";
import { useForm } from "../data/useForm.jsx";
import "@pagestyles/confirmData.scss";
import { registerErvaringsdeskundige } from "../postRequests/registerErvaringsdeskundige.js";
import { registerBedrijf } from "../postRequests/registerBedrijf.js";

function ConfirmData() {
  const { state } = useForm();

  async function handleSubmit() {
    if (state.user.userType === "Ervaringsdeskundige") {
      await registerErvaringsdeskundige(state.user);
    } else if (state.user.userType === "Bedrijf") {
      await registerBedrijf({ ...state.user, ...state.company });
    }
  }
  return (
    <>
      <Form
        title={"Klopt deze informatie"}
        buttonText="Maak account"
        onSubmit={handleSubmit}
      >
        <UserInfo user={state} />
      </Form>

      <Button onClick={printUser}>Bevestig</Button>
    </>
  );

  function printUser() {
    console.log({ ...state.user, ...state.company });
  }
}

function UserInfo(state) {
  const user = state.user;
  const company = state.company;
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
          <b>Hulpmiddelen</b>: {user.disabillityTypes}
        </p>
        <p>
          <b>Voorkeurbenaderingen</b>: {user.preferredApproach}
        </p>
      </>
    );
  } else if (user.user.userType === "Bedrijf") {
    return (
      <>
        <p>
          <b>Email</b>: {user.user.email}
        </p>
        <p>
          <b>Bedrijfsnaam</b>: {user.company.name}
        </p>
        <p>
          <b>Postcode</b>: {user.company.postcode}
        </p>
        <p>
          <b>Plaats</b>: {user.company.place}
        </p>
        <p>
          <b>Straat</b>: {user.company.street}
        </p>
        <p>
          <b>Nummer</b>: {user.company.number}
        </p>
        <p>
          <b>Website</b>: {user.company.websiteUrl}
        </p>
        <p>
          <b>Omschrijving</b>: {user.company.description}
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
