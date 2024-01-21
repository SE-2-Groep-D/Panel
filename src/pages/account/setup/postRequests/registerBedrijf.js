import {apiConfig} from '@api';
import { fetchApi } from "@api";

async function registerBedrijf(user) {
  const data = {
    voornaam: user.firstName,
          achternaam: user.lastName,
          googleAccount: user.googleAccount != null ? user.googleAccount : false,
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
  }
}
  
  export  {registerBedrijf};