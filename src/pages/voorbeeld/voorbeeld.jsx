import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function Voorbeeld() {
  //const location = useLocation();

  const testUser = {
    firstName: "ergmooi",
    lastName: "nogmooier",
    googleAccount: false,
    email: "andereemail@proberen.com",
    password: "test@1234",
    postcode: "34324km",
    canBeApproached: true,
    ageGroup: "18 tot 35",
    roles: ["string"],
  };

  return <button onClick={() => register(testUser)}>Click me</button>;
}

async function register(user) {
  try {
    console.log("ik word uitgevoerd");
    const response = await fetch("/api/Auth/RegisterErvaringsdeskundige", {
      method: "POST",
      body: JSON.stringify({
        voornaam: user.firstName,
        achternaam: user.lastName,
        googleAccount: false,
        email: user.email,
        password: user.password,
        postcode: user.postcode,
        toestemmingBenadering: user.canBeApproached,
        leeftijdscategorie: user.ageGroup,
        roles: user.roles,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log(
      JSON.stringify({
        voornaam: user.firstName,
        achternaam: user.lastName,
        googleAccount: false,
        email: user.email,
        password: user.password,
        postcode: user.postcode,
        toestemmingBenadering: user.canBeApproached,
        leeftijdscategorie: user.ageGroup,
      })
    );

    if (response.ok) {
      const data = await response.text();
      if (data) {
        console.log(data);
      } else {
        console.log("Message missing in the response.");
      }
    } else {
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.body);
    }
  } catch (error) {
    console.error(error.message);
  }
}

export default Voorbeeld;
