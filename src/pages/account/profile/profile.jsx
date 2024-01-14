import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "@pagestyles/account/_profile.scss";
import { useAuth } from "@hooks";
import { ApiResponseError, fetchData } from "@api";
import { useEffect, useState } from "react";
import { LoadingDiv } from "@components";

export default function Profile() {
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
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
          <b>{key}</b>: {user[key]}
        </li>
      );
    }
  }

  if (loading) return <LoadingDiv loading={true} />;
  return (
    <>
      <header>
        <FontAwesomeIcon icon={faCircleUser} className="userIcon" />
      </header>
      <main className="userInfoMain">
        <ul className="userInfo">{listItems}</ul>
      </main>
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

const bedrijfProfiel = [
  "Voornaam",
  "Achternaam",
  "Email",
  "Bedrijfsnaam",
  "Postcode",
  "Plaats",
  "Straat",
  "Nummer",
  "Website",
  "Omschrijving",
];

async function getUserInfo(id) {
  try {
    const response = await fetchData("Gebruiker/" + id);
    return response;
  } catch {
    console.log("niet gelukt om data te halen");
  }
}
