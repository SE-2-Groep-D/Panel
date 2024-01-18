import '@pagestyles/research/_research-info.scss';

import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {fetchData} from "@api";
import {useIntersectionObserver} from "@hooks";

// import components
import OnderzoekInformatie from "./components/OnderzoekInformatie";
import Information from './components/information';
import Map from "./components/map";
import {LoadingDiv} from "@components";


function OnderzoekInfo() {
    const {onderzoekId} = useParams();
    const [onderzoek, setOnderzoek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bedrijf, setBedrijf] = useState(null);
    const [bedrijfsCoordinaten, setBedrijfsCoordinaten] = useState(null);



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
            <LoadingDiv loading={loading} className='container'>
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
            </LoadingDiv>
        </main>

    );
}

export default OnderzoekInfo;
