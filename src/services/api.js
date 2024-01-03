async function fetchData(endpoint) {
    try {
        const response = await fetch('/api' + endpoint);
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log('Error while fetching data: ', error);
        throw error;
    }
}

export {fetchData};
