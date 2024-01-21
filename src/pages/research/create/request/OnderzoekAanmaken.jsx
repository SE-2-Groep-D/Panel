import {fetchApi} from '@api';

async function OnderzoekAanmaken(onderzoek,user) {
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
        const response = await fetchApi("/Onderzoek/create", "POST", data);
        console.log(response)

        if (onderzoek.type==="websiteBezoek"){

            const trackingscriptdata={
                onderzoekId: response.id,
                domain: response.websiteUrl
            }
            try {
                const response = await fetchApi("/Tracking/create", "POST", trackingscriptdata);
                console.log(response)
            }
            catch (error){
                return false
            }

        }

        return response;

    } catch (error) {
        return false;
    }


}

export  {OnderzoekAanmaken};

