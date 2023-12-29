// OnderzoekAPI.js of een vergelijkbaar bestand
import {fetchData} from "@services/api.js";

; // Pas dit pad aan naar waar je api.js bestand zich bevindt

export const fetchAllOnderzoeken = () => {
    return fetchData('/Onderzoek/list');
};

export const fetchOnderzoekById = (id) => {
    return fetchData(`/Onderzoek/${id}`);
};
/*
export const createOnderzoek = (onderzoekData) => {
    return fetchData('/Onderzoek/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onderzoekData)
    });
};

export const updateOnderzoek = (id, onderzoekData) => {
    return fetchData(`/Onderzoek/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onderzoekData)
    });
};

export const deleteOnderzoek = (id) => {
    return fetchData(`/Onderzoek/delete/${id}`, {
        method: 'DELETE'
    });
};
*/