import '@pagestyles/research.scss';

import OnderzoekInformatie from "@pages/research/components/OnderzoekInformatie.jsx";
import Map from "@pages/research/components/map";
import Information from './components/information';
import {fetchOnderzoekById} from './context/OnderzoekContext';
import {useEffect, useState} from "react";

function Onderzoek() {

    const [onderzoek, setOnderzoek] = useState(null);
    const [loading, setLoading] = useState(true);
    const onderzoekId = 'e5fb7b72-f716-4390-36d6-08dc03e50b27';


    useEffect(() => {
        fetchOnderzoekById(onderzoekId)
            .then(data => {
                console.log(data)
                setOnderzoek(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [onderzoekId]);



    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="container">
            <div className="content-left">
                <OnderzoekInformatie titel={onderzoek.titel}
                                     omschrijving={onderzoek.omschrijving}
                                     bedrijfid={onderzoek.bedrijfId}  />
            </div>
            <div className="content-right">
                <Information locatie={onderzoek.locatie}  vergoeding={onderzoek.vergoeding} datum={onderzoek.startDatum} />
                <Map/>
            </div>
        </div>
    );

}

export default Onderzoek;