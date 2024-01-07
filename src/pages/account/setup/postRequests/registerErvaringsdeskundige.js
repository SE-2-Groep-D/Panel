async function registerErvaringsdeskundige(user) {
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
          toestemmingBenadering: user.canBeApproached === "true",
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
  
  export  {registerErvaringsdeskundige};