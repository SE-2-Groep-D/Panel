import {fetchApi} from '@api';
import {useAuth} from "@hooks";
//const userData = useAuth().userInfo;
async function OnderzoekAanmaken(onderzoek) {
    console.log(onderzoek)
  //  const {userInfo} = await  useAuth();
   // console.log(userInfo.bedrijfId)
    const data = {
        titel: onderzoek.titel,
        aantalParticipanten: onderzoek.aantalParticipanten,
        websiteUrl: onderzoek.websiteUrl,
        startDatum: onderzoek.datum,
        omschrijving: onderzoek.omschrijving,
        vergoeding: onderzoek.vergoeding,
        locatie: onderzoek.plaats,
        status: onderzoek.status,
        bedrijfId: 'A8B0176F-D49B-4345-CA0E-08DC13883C4E'
        //type userInfo.id

    }

    try {
        console.log(data)
        const response = await fetchApi("/Onderzoek/create", "POST", data);

        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

export {OnderzoekAanmaken};