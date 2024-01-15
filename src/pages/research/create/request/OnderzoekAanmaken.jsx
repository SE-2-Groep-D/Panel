import {fetchApi} from '@api';

async function OnderzoekAanmaken(onderzoek,user) {
    console.log(onderzoek)
    const data = {
        titel: onderzoek.titel,
        aantalParticipanten: onderzoek.aantalParticipanten,
        websiteUrl: onderzoek.websiteUrl,
        startDatum: onderzoek.datum,
        omschrijving: onderzoek.omschrijving,
        vergoeding: onderzoek.vergoeding,
        locatie: onderzoek.plaats,
        status: 'open',
        type:onderzoek.type,
        bedrijfId: user.id
    }

    try {
        console.log(data)
        const response = await fetchApi("/Onderzoek/create", "POST", data);
        console.log(response)
        return response;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

export  {OnderzoekAanmaken};

