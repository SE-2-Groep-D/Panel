import {Button, Form, InputField} from "@components";
import { useAuth } from "@hooks";
import { fetchApi, isRole, Role } from "@api";
import {useNavigate} from "react-router-dom";

function EditForm({user, setUser }) {
  const isBedrijf = isRole(Role.Bedrijf);
  const isErvaringsdeskundige = isRole(Role.Ervaringsdeskundige);
  const auth = useAuth();
  const navigate = useNavigate()

  function handleSubmit() {
    if (isBedrijf) {
      updateUserInfo(createBedrijfObjectApi(user));
    } else if (isErvaringsdeskundige) {
      updateUserInfo(createErvaringsdeskundigeObjectApi(user));
    } else {
      updateUserInfo(createGebruikerObjectApi(user));
    }
  }

  function handleChange({ element, value, id }) {
    setUser({ ...user, [id ? id : element.id]: value });
  }

  let listInputs = [];

    for (let key in user) {
      const value = user[key];
      if(key.toLowerCase() === "id") continue;

      listInputs.push(
          <InputField
              key={key}
              id={key}
              onChange={handleChange}
              value={user[key]}
              size={(value.length >= 50) ? "big" : "small"}
          >
            {key}
          </InputField>
      );
    }

  return (
      <>
        <Form buttonText="Opslaan" onSubmit={handleSubmit} title={"Profiel"}>
          {listInputs}
        </Form>
        <Button label='Klik op de knop om het account te verwijderen.' color="tertiary" varient="text" onClick={() => deleteUser(user, setUser, auth, navigate)}>Verwijder Account</Button>
      </>
  );
}

async function updateUserInfo(user, setUser) {
  setUser(undefined);

  try {
    await fetchApi(`/Gebruiker/${user.id}/update`, "PUT", user);
    setUser(user);
  } catch (error) {
    console.log(error);
    setUser(error);
  }
}

async function deleteUser(user, setUser, auth, navigate) {
  const finalUser = user;
  const {logoutUser, userInfo} = auth;
  setUser(undefined);

  try {
    await fetchApi(`/Gebruiker/${finalUser.id}/delete`, "DELETE");
    setUser(user);

    if(user.id === userInfo.id) {
      logoutUser();
      navigate('/');
      return;
    }

    navigate("/admin/gebruiker/list");
  } catch (error) {
    console.log(error);
    setUser(error);
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

function createGebruikerObjectApi(user) {
  const userCreated = {
    voornaam: user.Voornaam,
    achternaam: user.Achternaam,
    email: user.Email,
  };
  return userCreated;
}

export default EditForm;
