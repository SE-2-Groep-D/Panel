import {fetchData} from "@api";


async function getUserInfo(id) {
    try {
      return await fetchData("Gebruiker/" + id);
    } catch (err) {
      return err;
    }
}

export {getUserInfo}