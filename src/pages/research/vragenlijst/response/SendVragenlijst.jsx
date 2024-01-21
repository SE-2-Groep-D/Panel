import {fetchApi} from '@api';

async function SendVragenlijst(id,data) {

    try {
        const response = await  fetchApi(`/Vragenlijst/${id}/submit`, "POST", data);

        return response;
    } catch (error) {
        return false;
    }
}

export  {SendVragenlijst};