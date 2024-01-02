import {useEffect, useState} from "react";
import OnderzoekInformatie from "@pages/research/components/OnderzoekInformatie.jsx";
import Map from "@pages/research/components/map";
import Information from './components/information';
import {fetchOnderzoekById} from './context/onderzoekservice.js';
import {useParams} from 'react-router-dom';
import {LoadingDiv} from "@components";
import '@pagestyles/onderzoek.scss';
import {fetchBedrijfById} from "@pages/research/context/bedrijfservice.js";

function Onderzoek() {
    const {onderzoekId} = useParams();
    const [onderzoek, setOnderzoek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bedrijf, setBedrijf] = useState(null);
    const [bedrijfsCoordinaten, setBedrijfsCoordinaten] = useState(null);


    const getCoordinatesForAddress = (address) => {
        const url = new URL('https://nominatim.openstreetmap.org/search');
        const params = {
            q: address,
            format: 'json',
            limit: 1,
        };
        url.search = new URLSearchParams(params).toString();

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    throw new Error('Address not found');
                }
                const {lat, lon} = data[0];
                return {lat, lng: lon};
            });
    };

    useEffect(() => {
        if (onderzoekId) {
            fetchOnderzoekById(onderzoekId)
                .then(data => {
                    setOnderzoek(data);
                    if (data.bedrijfId) {
                        return fetchBedrijfById(data.bedrijfId);
                    }
                    return null;
                })
                .then(bedrijfData => {
                    if (bedrijfData) {
                        setBedrijf(bedrijfData);
                        if (bedrijfData.postcode && bedrijfData.plaats) {
                            console.log(bedrijfData)

                            const fullAddress = `${bedrijfData.straat} ${bedrijfData.nummer}, ${bedrijfData.postcode}, ${bedrijfData.plaats}`;
                            return getCoordinatesForAddress(fullAddress);
                        }
                    }
                    return null;
                })
                .then(coordinates => {
                    if (coordinates) {
                        setBedrijfsCoordinaten(coordinates);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setLoading(false);
                });
        }
    }, [onderzoekId]); // onderzoekId is de enige dependency hier


    if (!onderzoek && !loading) {
        return <p>Onderzoek niet gevonden.</p>;
    }

    return (
        <LoadingDiv loading={loading}>
            <div className="container">
                {onderzoek && (
                    <>
                        <div className="content-left-container">
                            <OnderzoekInformatie titel={onderzoek.titel}
                                                 omschrijving={onderzoek.omschrijving}
                                                 bedrijf={bedrijf}/>
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
    );
}

export default Onderzoek;
