import {fetchData} from '@api';

async function GetVragenlijst(onderzoekId) {


    try {
        const vragenlijstList = await fetchData(`Vragenlijst?onderzoekId=${onderzoekId}`);

        const firstVragenlijst = vragenlijstList[0];
        const vragenLijst = await fetchData(`/Vragenlijst/${firstVragenlijst.id}`);
        console.log(vragenLijst)
        return vragenLijst;
    } catch (error) {
        return false;
    }
}

export  {GetVragenlijst};