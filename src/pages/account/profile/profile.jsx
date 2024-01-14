import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "@pagestyles/account/_profile.scss";
import { useAuth } from "@hooks";
import { fetchData, fetchApi } from "@api";
import { useEffect, useState } from "react";
import { LoadingDiv, Button, Form, InputField } from "@components";

export default function Profile() {
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const getDataUser = async () => {
      const response = await getUserInfo(userInfo.id);
      if (userInfo.userType === "Bedrijf") {
        setUser(createBedrijfObject(response));
      } else {
        setUser(createErvaringsdeskundigeObject(response));
      }
      setLoading(false);
    };
    getDataUser();
  }, []);

  let listItems = [];

  if (user != null) {
    for (let key in user) {
      listItems.push(
        <li key={key}>
          <span>{key}</span>
          {user[key]}
        </li>
      );
    }
  }
  function handleSubmit() {
    if (userInfo.userType === "Bedrijf") {
      updateUserInfo(createBedrijfObjectApi(user), userInfo.id);
    } else {
      updateUserInfo(createErvaringsdeskundigeObjectApi(user), userInfo.id);
    }

    setIsEditing(false);
  }

  function handleChange({ element, value, id }) {
    setUser({ ...user, [id ? id : element.id]: value });
  }

  if (loading) return <LoadingDiv loading={true} />;
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
    <>
      <header>
        <FontAwesomeIcon icon={faCircleUser} className="userIcon" />
      </header>
      {isEditing && (
        <Form buttonText="Opslaan" onSubmit={handleSubmit} title={"Bewerken"}>
          {listInputs}
        </Form>
      )}
      {!isEditing && (
        <main className="userInfoMain">
          <ul className="userInfo">
            {listItems}
            <Button onClick={() => setIsEditing(true)}>Aanpassen</Button>
          </ul>
        </main>
      )}
    </>
  );
}

function createErvaringsdeskundigeObject(user) {
  const userCreated = {
    Voornaam: user.voornaam,
    Achternaam: user.achternaam,
    Email: user.email,
    Telefoonnummer: "komtnog",
    Postcode: user.postcode,
    Leeftijdscategorie: user.leeftijdscategorie,
    Voorkeurbenadering: "kkomtnog",
    Hulpmiddelen: "komtnog",
  };
  return userCreated;
}

function createErvaringsdeskundigeObjectApi(user) {
  const userCreated = {
    voornaam: user.Voornaam,
    achternaam: user.Achternaam,
    email: user.Email,
    //phoneNumber: user.Telefoonnummer,
    postcode: user.Postcode,
    leeftijdscategorie: user.Leeftijdscategorie,
    benaderingen: ["email"],
    //hulpmiddelen: ["komtnog"],
  };
  return userCreated;
}

function createBedrijfObject(user) {
  const userCreated = {
    Voornaam: user.voornaam,
    Achternaam: user.achternaam,
    Email: user.email,
    Bedrijfsnaam: user.bedrijfsnaam,
    Postcode: user.postcode,
    Plaats: user.plaats,
    Straat: user.straat,
    Nummer: user.nummer,
    Website: user.websiteUrl,
    Omschrijving: user.omschrijving,
  };
  return userCreated;
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

async function getUserInfo(id) {
  try {
    const response = await fetchData("Gebruiker/" + id);
    return response;
  } catch {
    console.log("niet gelukt om data te halen");
  }
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
