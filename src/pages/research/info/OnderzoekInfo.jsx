import '@pagestyles/research/_research-info.scss';

import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {fetchData} from "@api";

// import components
import OnderzoekInformatie from "./components/OnderzoekInformatie";
import Information from './components/information';
import Map from "./components/map";
import {Button, LoadingDiv} from "@components";
import {Status} from "@pages/news/data/newsContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "@hooks";


function OnderzoekInfo() {
    const {userInfo} = useAuth();
    const {onderzoekId} = useParams();
    const [onderzoek, setOnderzoek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bedrijf, setBedrijf] = useState(null);
    const [bedrijfsCoordinaten, setBedrijfsCoordinaten] = useState(null);
    const navigate = useNavigate();
    const goToOnderzoekResultaten = (id) => {
        navigate(`/onderzoek/${id}/results`);
    };

    const getCoordinatesForAddress = async (address) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`);
        const data = await response.json();

        if (!data.length) throw new Error('Address not found');

        const {lat, lon: lng} = data[0];
        return {lat, lng};
    };

    useEffect(() => {
        const fetchOnderzoekInfo = async () => {
            if (!onderzoekId) return;
            try {
                const onderzoekData = await fetchData(`/Onderzoek/${onderzoekId}`);
                setOnderzoek(onderzoekData);
                if (!onderzoekData?.bedrijfId) return;

                const bedrijfData = await fetchData(`/Gebruiker/${onderzoekData.bedrijfId}`);
                if (!bedrijfData) return;

                setBedrijf(bedrijfData);
                const {straat, nummer, postcode, plaats} = bedrijfData;
                if (!postcode || !plaats || !nummer || !postcode) return;

                const fullAddress = `${straat} ${nummer}, ${postcode}, ${plaats}`;
                const coordinates = await getCoordinatesForAddress(fullAddress);
                setBedrijfsCoordinaten(coordinates || {});
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOnderzoekInfo();
    }, [onderzoekId]);


    if (!onderzoek && !loading) {
        return <p>Onderzoek niet gevonden.</p>;
    }

    return (
        <main>
            <LoadingDiv loading={loading}>
                <div className="container">
                    {onderzoek && (
                        <>
                            <div className="content-left-container">
                                <OnderzoekInformatie titel={onderzoek.titel}
                                                     omschrijving={onderzoek.omschrijving}
                                                     bedrijf={bedrijf}/>

                                {
                                    (userInfo.userType === 'Medewerker' || userInfo.userType === 'Bedrijf') ?
                                        <div className="button-onderzoekinfo">
                                            <div className="button-onderzoekinfo-1">
                                                <Button className="onderzoek-resultaten"
                                                        onClick={() => goToOnderzoek(onderzoek.id)}>Bewerken</Button>
                                            </div>
                                            <div>
                                                <Button className="onderzoek-resultaten"
                                                        onClick={() => goToOnderzoekResultaten(onderzoek.id)}>Bekijk
                                                    resultaten</Button>
                                            </div>
                                        </div>
                                        :
                                        <div className="button-onderzoekinfo">
                                            <div>
                                                <Button className="onderzoek-resultaten"
                                                        onClick={() => goToOnderzoekResultaten(onderzoek.id)}>Inschrijven</Button>
                                            </div>
                                        </div>
                                }

                            </div>
                            <div className="content-right-container">
                                <Information locatie={onderzoek.locatie}
                                             vergoeding={onderzoek.vergoeding}
                                             datum={onderzoek.startDatum}/>
                                {bedrijfsCoordinaten && <Map coordinates={bedrijfsCoordinaten} bedrijf={bedrijf}/>}
                            </div>
                        </>
                    )}
                </div>
            </LoadingDiv>
        </main>

    );
}

export default OnderzoekInfo;
