import '@pagestyles/algemeneOnderzoek.scss';
import {useEffect, useState} from "react";
import {fetchAllOnderzoeken} from './context/onderzoekservice.js';
import {Button, LoadingDiv} from "@components";

import {useNavigate} from 'react-router-dom';
import FormatDate from "@pages/research/components/formDate.jsx";

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
                console.log(data)
                setOnderzoeken(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);
    useEffect(() => {
        fetchAllOnderzoeken()
            .then(data => {
                console.log(data)
                setOnderzoeken(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);


    return (

        <LoadingDiv loading={isLoading}>
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
                                    <div>{FormatDate(onderzoek.startDatum)}</div>
                                    <Button children="Onderzoek Info" onClick={() => goToOnderzoek(onderzoek.id)}/>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </LoadingDiv>

    );
}

export default AlgemeneOnderzoek;
