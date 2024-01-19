import {fetchData} from "@api";
import {useEffect} from "react";

async function getUserData(id, setUser) {
   const user = await  getUserInfo(id);

   if(user.type === "Ervaringsdeskundige") {
     setUser(
         createErvaringsdeskundigeObject(user)
     );
     return;
   }

   if(user.type === "Bedrijf") {
     setUser(
         createBedrijfObject(user)
     );
   }


   setUser(
       createGebruikerObject(user)
   );
}

export { getUserData };

async function getUserInfo(id) {
    try {
      return await fetchData("Gebruiker/" + id);
    } catch (err) {
      return err;
    }
  }

  function createErvaringsdeskundigeObject(user) {
    let hulpmiddelen = "";
    if(user.hulpmiddelen === null){
      hulpmiddelen = "nog geen hulpmiddel opgeslagen"
    }

    for(let hulpmiddel of user.hulpmiddelen) {
      hulpmiddelen = hulpmiddelen + " " + hulpmiddel.naam
    }
    let benaderingen = "";
    if(user.voorkeurbenaderingen === null){
      benaderingen = "nog geen voorkeursbenadering opgeslagen"
    }
    for(let benadering of user.voorkeurbenaderingen) {
      benaderingen = benaderingen + " " + benadering.type
    }

    const userCreated = {
      id: user.id,
      Voornaam: user.voornaam,
      Achternaam: user.achternaam,
      Email: user.email,
      Postcode: user.postcode,
      Leeftijdscategorie: user.leeftijdscategorie,
      Voorkeurbenadering: benaderingen,
      Hulpmiddelen: hulpmiddelen,
    };

    return userCreated;
  }
  
  function createBedrijfObject(user) {
    const userCreated = {
      id: user.id,
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

  function createGebruikerObject (user) {
    const userCreated = {
      id: user.id,
      Voornaam: user.voornaam,
      Achternaam: user.achternaam,
      Email: user.email,
    };
    return userCreated;
  }