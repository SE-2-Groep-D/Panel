import {fetchData} from "@services/api.js";

export const fetchBedrijfById = (id) => {
    return fetchData(`/Gebruiker/${id}`);
};