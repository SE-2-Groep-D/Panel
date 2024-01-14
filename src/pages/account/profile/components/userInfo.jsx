import { Button, LoadingDiv } from "@components";

import { useEffect, useState } from "react";
import { fetchData } from "@api";

export default function UserInfo({ user, setIsEditing, loading }) {
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

  if (loading) return <LoadingDiv loading={true} />;

  return (
    <main className="userInfoMain">
      <ul className="userInfo">
        {listItems}
        <Button onClick={() => setIsEditing(true)}>Aanpassen</Button>
      </ul>
    </main>
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
