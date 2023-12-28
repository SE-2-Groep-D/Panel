import '@pagestyles/research.scss';
import OnderzoekInformatie from "@pages/research/components/OnderzoekInformatie.jsx";
import Map from "@pages/research/components/map";
import Information from './components/information';
import {fetchOnderzoekById} from './context/OnderzoekContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function Onderzoek() {
    const { onderzoekId } = useParams();
    const [onderzoek, setOnderzoek] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (onderzoekId) {
            fetchOnderzoekById(onderzoekId)
                .then(data => {
                    console.log(data);
                    setOnderzoek(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setLoading(false);
                });
        }
    }, [onderzoekId]);



    if (loading) {
        return <p>Loading...</p>;
    }

    if (!onderzoek) {
        return <p>Onderzoek niet gevonden.</p>;
    }

    return (
        <div className="container">
            <div className="content-left-container">
                <OnderzoekInformatie titel={onderzoek.titel}
                                     omschrijving={onderzoek.omschrijving}
                                     bedrijfid={onderzoek.bedrijfId} />
            </div>
            <div className="content-right-container">

                <Information locatie={onderzoek.locatie}
                             vergoeding={onderzoek.vergoeding}
                             datum={onderzoek.startDatum} />
                <Map />
            </div>
        </div>
    );
}

export default Onderzoek;
