import { fetchData } from "@api";
import { useEffect } from "react";
import { useAuth } from "@hooks";

function getUserData(setUser, setLoading) {
    const { userInfo } = useAuth();
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