import {fetchApi} from '@api';

async function registerErvaringsdeskundige(user) {
  const data = {
    voornaam: user.firstName,
    achternaam: user.lastName,
    googleAccount: user.googleAccount != null ? user.googleAccount : false,
    email: user.email,
    password: user.password,
    postcode: user.postcode,
    toestemmingBenadering: user.canBeApproached === "true",
    leeftijdscategorie: user.ageGroup,
    roles: user.roles,
    nieuweHulpmiddelen: user.tools.split(","),
    nieuweVoorkeursbenaderingen: [user.preferredApproach]
  }

  try {
    const response = await fetchApi("Auth/RegisterErvaringsdeskundige", "POST", data);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

// async function registerErvaringsdeskundige(home) {
//   const hostname = (apiConfig.inDevelopment) ? apiConfig.development : apiConfig.production;
//     try {
//       console.log("ik word uitgevoerd");
//       const response = await fetch(hostname + "Auth/RegisterErvaringsdeskundige", {
//         method: "POST",
//         body: JSON.stringify({
//           voornaam: home.firstName,
//           achternaam: home.lastName,
//           googleAccount: false,
//           email: home.email,
//           password: home.password,
//           postcode: home.postcode,
//           toestemmingBenadering: home.canBeApproached === "true",
//           leeftijdscategorie: home.ageGroup,
//           roles: home.roles,
//         }),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       });
  
//       console.log(
//         JSON.stringify({
//           voornaam: home.firstName,
//           achternaam: home.lastName,
//           googleAccount: false,
//           email: home.email,
//           password: home.password,
//           postcode: home.postcode,
//           toestemmingBenadering: home.canBeApproached,
//           leeftijdscategorie: home.ageGroup,
//         })
//       );
  
//       if (response.ok) {
        
//         const data = await response.text();
//         if (data) {
//           console.log(data);
//         } else {
//           console.log("Message missing in the response.");
//         }
//         return true;
//       } else {
//         console.log(response.status);
//         console.log(response.statusText);
//         console.log(response.body);
//         return false;
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
  
  export  {registerErvaringsdeskundige};