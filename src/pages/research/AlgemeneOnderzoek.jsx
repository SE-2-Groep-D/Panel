import '@pagestyles/algemeneOnderzoek.scss';
import { useEffect, useState } from "react";
import { fetchAllOnderzoeken } from './context/OnderzoekContext';
import {Button} from "@components";
import Onderzoek from "@pages/research/Onderzoek.jsx";
import { useNavigate } from 'react-router-dom';
function AlgemeneOnderzoek() {
    const [onderzoeken, setOnderzoeken] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const goToOnderzoek = (id) => {
        navigate(`/onderzoek/${id}`);
    };

    useEffect(() => {
        fetchAllOnderzoeken()
            .then(data => {
                setOnderzoeken(data); // Zorg ervoor dat dit de juiste data structuur bevat
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="research-list">
            <h1>Onderzoeken</h1>
            <div className="filters">
                {/* Filters kunnen hier geplaatst worden indien nodig */}
            </div>
            <div className="research-items">
                {onderzoeken.map(onderzoek => (
                    <div className="research-item" key={onderzoek.id}>
                        <div className="research-item-content">
                            <h2 className="research-title">{onderzoek.titel}</h2>
                            <p className="research-description">{onderzoek.omschrijving}</p>
                            {/* Voeg hier andere details toe indien nodig */}
                        </div>
                        <div className="research-item-actions">
                            <Button children="Onderzoek Info" onClick={() => goToOnderzoek(onderzoek.id)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlgemeneOnderzoek;
