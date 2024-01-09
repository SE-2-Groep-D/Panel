import '@pagestyles/Onderzoeken.scss';

// Import from libraries
import { fetchData } from "@api";
import {formatDate} from "@services";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";

// import components
import {Button, LoadingDiv} from "@components";


function Onderzoeken() {
    const [onderzoeken, setOnderzoeken] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const navigate = useNavigate();
    const goToOnderzoek = (id) => {
        navigate(`/onderzoek/${id}`);
    };


    useEffect(() => {
        async function fetchAllOnderzoeken() {
            try {
                const data = await fetchData('/Onderzoek/list');
                setOnderzoeken(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false)
            }
        }

        fetchAllOnderzoeken();
    }, []);

    return (


        <main className="onderzoeken-page">
            <div className="onderzoek-tabel">
                <div className="onderzoek-info">
                    <div className="titel">
                        <h1>Onderzoeken</h1>
                    </div>
                    <div className="filters">
                        hier komt filters
                    </div>
                </div>
                <div className="onderzoek-items">
                    <LoadingDiv loading={isLoading}>
                        {onderzoeken.map(onderzoek => (
                            <div className="onderzoek-item" key={onderzoek.id}>
                                <div className="content-left">
                                    <h2>{onderzoek.titel}</h2>
                                    <div className="onderzoek-omschrijving">{onderzoek.omschrijving}</div>
                                </div>
                                <div className="content-right">
                                    <p className="">{onderzoek.status}</p>
                                    <p className="">€{onderzoek.vergoeding}</p>
                                    <p className="">{onderzoek.aantalParticipanten}</p>
                                    <p className="">{onderzoek.locatie}</p>
                                    <div>{formatDate(onderzoek.startDatum)}</div>
                                    <div className="button-div">
                                        <Button onClick={() => goToOnderzoek(onderzoek.id)}> OnderzoekInfo Info </Button>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </LoadingDiv>
                </div>
            </div>
        </main>

    );
}

export default Onderzoeken;