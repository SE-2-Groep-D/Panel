import '@pagestyles/Onderzoeken.scss';

// Import from libraries
import {fetchData} from "@api";
import {formatDate} from "@services";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";

// import components
import {Button, LoadingDiv, OptionSelector} from "@components";


function Onderzoeken() {
    const [alleOnderzoeken, setAlleOnderzoeken] = useState([]);
    const [getoondeOnderzoeken, setGetoondeOnderzoeken] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bedrijfsGegevens, setBedrijfsGegevens] = useState({});
    const [selectedBedrijf, setSelectedBedrijf] = useState('Alle');
    const [bedrijfsOpties, setBedrijfsOpties] = useState(["Alle"]);
    const navigate = useNavigate();

    const goToOnderzoek = (id) => {
        navigate(`/onderzoek/${id}`);
    };

    useEffect(() => {
        document.body.classList.add('body-special-color');
        return () => {
            document.body.classList.remove('body-special-color');
        };
    }, []);

    useEffect(() => {
        async function fetchAllOnderzoeken() {
            setIsLoading(true);
            try {
                let onderzoekenData = await fetchData('/Onderzoek/list');
                let uniekeBedrijfsIds = new Set(onderzoekenData.map(o => o.bedrijfId));
                let bedrijven = {};

                for (const id of uniekeBedrijfsIds) {
                    const bedrijfsnaam = await fetchBedrijfGegevens(id);
                    bedrijven[id] = bedrijfsnaam;
                }

                setBedrijfsGegevens(bedrijven);
                setBedrijfsOpties(["Alle", ...new Set(Object.values(bedrijven))]);
                setAlleOnderzoeken(onderzoekenData);
                setGetoondeOnderzoeken(onderzoekenData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAllOnderzoeken();
    }, []);

    useEffect(() => {
        if (selectedBedrijf === "Alle") {
            setGetoondeOnderzoeken(alleOnderzoeken);
        } else {
            const gefilterdeOnderzoeken = alleOnderzoeken.filter(o => bedrijfsGegevens[o.bedrijfId] === selectedBedrijf);
            setGetoondeOnderzoeken(gefilterdeOnderzoeken);
        }
    }, [selectedBedrijf, alleOnderzoeken, bedrijfsGegevens]);

    const fetchBedrijfGegevens = async (bedrijfId) => {
        try {
            const response = await fetchData(`/Gebruiker/${bedrijfId}`);
            return response.bedrijfsnaam; // Of een andere eigenschap die je nodig hebt van het bedrijf
        } catch (error) {
            console.error('Fout bij het ophalen van bedrijfsgegevens:', error);
            return null; // Of een passende foutafhandeling
        }
    };


    return (


        <main className="onderzoeken-page">
            <div className="onderzoek-tabel">
                <div className="onderzoek-info">
                    <div className="titel">
                        <div className="content-titel heading-1">Onderzoeken</div>
                    </div>
                    <div className="filters">
                        <OptionSelector
                            onChange={(e) => setSelectedBedrijf(e.value)}
                            options={bedrijfsOpties}
                            value={selectedBedrijf}
                        >
                            Bedrijf
                        </OptionSelector>

                    </div>
                </div>
                <div className="onderzoek-items">
                    <LoadingDiv loading={isLoading}>
                        {getoondeOnderzoeken.map(onderzoek => (
                            <div className="onderzoek-item" key={onderzoek.id}>
                                <div className="content-left">
                                    <div className=" heading-3">{onderzoek.titel}</div>
                                    <div className="text">{onderzoek.omschrijving}</div>
                                </div>
                                <div className="content-right">
                                    <div className="content-tags">
                                        <p className="content-informatie-een tag">{bedrijfsGegevens[onderzoek.bedrijfId]}</p>
                                        <p className="content-informatie tag">€{onderzoek.vergoeding}</p>
                                    </div>
                                    <div className="content-info">
                                        <p className="text">{onderzoek.aantalParticipanten}</p>
                                        <p className="text">{onderzoek.locatie}</p>
                                        <div className="text">{formatDate(onderzoek.startDatum)}</div>
                                    </div>
                                    <div className="button-div">
                                        <Button className="onderzoek-button"
                                                onClick={() => goToOnderzoek(onderzoek.id)}> Onderzoek Info </Button>
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