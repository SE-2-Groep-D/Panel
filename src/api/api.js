import {getHostName} from '@api';

async function fetchData(endpoint) {
   return await fetchApi(endpoint, {}, "GET");
}

async function fetchApi(endpoint, data, method) {
    const hostname = getHostName();

    try {
        const response = await fetch(hostname + endpoint, {
            method: method,
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if(!response.ok) {
            console.log('Failed to communicate with: ', response.url);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.log('Error while fetching data: ', error);
        throw error;
    }
}


export {fetchData, fetchApi};
