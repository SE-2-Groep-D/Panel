import {fetchData, isRole, Role} from "@api";
import { useEffect } from "react";
import { useAuth } from "@hooks";

function getUserData(setUser, setLoading) {
    const { userInfo } = useAuth();
    const isBedrijf = isRole(Role.Bedrijf);
    const isErvaringsdeskundige = isRole(Role.Ervaringsdeskundige)
    useEffect(() => {
        const getDataUser = async () => {
          const response = await getUserInfo(userInfo.id);
          console.log()
          if (isBedrijf) {
            setUser(createBedrijfObject(response));
          } else if (isErvaringsdeskundige) {
            setUser(createErvaringsdeskundigeObject(response));
          } else {
            setUser(createGebruikerObject(response));
          }
          setLoading(false);
        };
        getDataUser();
      }, []);
}

export { getUserData };

async function getUserInfo(id) {
    try {
      const response = await fetchData("Gebruiker/" + id);
      return response;
    } catch {
      console.log("niet gelukt om data te halen");
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
      Voornaam: user.voornaam,
      Achternaam: user.achternaam,
      Email: user.email,
    };
    return userCreated;
  }