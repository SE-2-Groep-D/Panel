import {apiConfig} from '@api';
import { fetchApi } from "@api";

async function OnderzoekAanmaken(onderzoek) {
    console.log(onderzoek)
   /* const data = {
        voornaam: onderzoek.firstName,
        achternaam: user.lastName,
        googleAccount: false,
        email: user.email,
        password: user.password,
        bedrijfsnaam: user.name,
        postcode: user.postcode,
        plaats: user.place,
        straat: user.street,
        nummer: user.number,
        websiteUrl: user.websiteUrl,
        omschrijving: user.description,
    }

    try {
        const response = await fetchApi("Auth/RegisterBedrijf", "POST", data);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }*/
}

// async function registerBedrijf(user) {
//   const hostname = (apiConfig.inDevelopment) ? apiConfig.development : apiConfig.production;
//     try {
//       console.log("ik word uitgevoerd");
//       const response = await fetch(hostname + "Auth/RegisterBedrijf", {
//         method: "POST",
//         body: JSON.stringify({
//           voornaam: user.firstName,
//           achternaam: user.lastName,
//           googleAccount: false,
//           email: user.email,
//           password: user.password,
//           bedrijfsnaam: user.name,
//           postcode: user.postcode,
//           plaats: user.place,
//           straat: user.street,
//           nummer: user.number,
//           websiteUrl: user.websiteUrl,
//           omschrijving: user.description,
//         }),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       });

//       console.log(
//         JSON.stringify({
//             voornaam: user.firstName,
//             achternaam: user.lastName,
//             googleAccount: false,
//             email: user.email,
//             password: user.password,
//             bedrijfsnaam: user.name,
//             postcode: user.postcode,
//             plaats: user.place,
//             straat: user.street,
//             nummer: user.number,
//             websiteUrl: user.websiteUrl,
//             omschrijving: user.description,
//         })
//       );

//       if (response.ok) {
//         const data = await response.text();
//         if (data) {
//           console.log(data);
//         } else {
//           console.log("Message missing in the response.");
//         }
//       } else {
//         console.log(response.status);
//         console.log(response.statusText);
//         console.log(response.body);
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

export  {OnderzoekAanmaken};