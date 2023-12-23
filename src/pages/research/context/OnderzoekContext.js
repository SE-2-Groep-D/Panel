
const baseUrl = 'http://localhost:3001/Onderzoek'; // Dit is tijdelijk


export const fetchAllOnderzoeken = () => {
    return fetch(`${baseUrl}/list`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
};

export const fetchOnderzoekById = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            // Handle errors here
            console.error('Fetch error:', error);
            throw error;
        });
};


export const  createOnderzoek=(onderzoekData) => {
    fetch(`${baseUrl}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onderzoekData)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}


export const updateOnderzoek =(id, onderzoekData)=> {
    fetch(`${baseUrl}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onderzoekData)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}


export const deleteOnderzoek=(id)=> {
    fetch(`${baseUrl}/delete/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}