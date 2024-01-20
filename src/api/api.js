import {getHostName} from '@api';

async function fetchData(endpoint) {
   return await fetchApi(endpoint, "GET");
}

class ApiResponseError extends Error {
    constructor(message, response) {
        super(message);
        this.name = 'ApiResponseError';
        this.response = response;
        this.statusCode = response ? response.status : undefined;
    }
}

async function fetchApi(endpoint, method, data) {
    const hostname = getHostName();
    endpoint = (endpoint.startsWith('/')) ? endpoint : "/" + endpoint;
    try {
        const response = await fetch(hostname + endpoint, {
            method: method,
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error while fetching data:', error);
        throw new ApiResponseError(error.message, error.response);
    }
}

async function handleResponse(response) {
    if (!response.ok) {
        console.error('Failed to communicate with:', response.url);
        throw new ApiResponseError(`HTTP error! Status: ${response.status}`, response);
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return response.text();
}


export {fetchData, fetchApi, ApiResponseError};
