import {apiConfig} from './config.js';

async function fetchData(endpoint) {
    const hostname = (apiConfig.inDevelopment) ? apiConfig.development : apiConfig.production;

    try {
        const response = await fetch(hostname + endpoint);
        if(!response.ok) {
            console.log('Failed to fetch dat from: ', response.url);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log('Error while fetching data: ', error);
        throw error;
    }
}

export {fetchData};
