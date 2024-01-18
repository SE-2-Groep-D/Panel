import { Form, InputField } from "@components";
import { useAuth } from "@hooks";
import {fetchApi, isRole, Role} from "@api";

function EditForm({ isEditing, setIsEditing, user, setUser }) {
  const { userInfo } = useAuth();
  function handleSubmit() {
    if (isRole(Role.Bedrijf)) {
      updateUserInfo(createBedrijfObjectApi(user), userInfo.id);
    } else {
      updateUserInfo(createErvaringsdeskundigeObjectApi(user), userInfo.id);
    }

    setIsEditing(false);
  }

  function handleChange({ element, value, id }) {
    setUser({ ...user, [id ? id : element.id]: value });
  }

  let listInputs = [];
  if (isEditing) {
    for (let key in user) {
      listInputs.push(
        <InputField
          key={key}
          id={key}
          onChange={handleChange}
          value={user[key]}
        >
          {key}
        </InputField>
      );
    }
  }

  return (
    <Form buttonText="Opslaan" onSubmit={handleSubmit} title={"Bewerken"}>
      {listInputs}
    </Form>
  );
}

async function updateUserInfo(user, id) {
  try {
    const endpoint = "Gebruiker/" + id + "/update";
    await fetchApi(endpoint, "PUT", user);
  } catch (error) {
    console.log(error);
    console.log("update ging mis");
  }
}

function createBedrijfObjectApi(user) {
  const userCreated = {
    voornaam: user.Voornaam,
    achternaam: user.Achternaam,
    email: user.Email,
    postcode: user.Postcode,
    bedrijfsnaam: user.Bedrijfsnaam,
    plaats: user.Plaats,
    straat: user.Straat,
    nummer: user.Nummer,
    websiteUrl: user.Website,
    omschrijving: user.Omschrijving,
  };
  return userCreated;
}

function createErvaringsdeskundigeObjectApi(user) {
  const userCreated = {
    voornaam: user.Voornaam,
    achternaam: user.Achternaam,
    email: user.Email,
    postcode: user.Postcode,
    leeftijdscategorie: user.Leeftijdscategorie,
    //benaderingen: user.Voorkeurbenadering.split(" "),
    //hulpmiddelen: user.Hulpmiddelen.split(" "),
  };
  return userCreated;
}

export default EditForm;
