import '@pagestyles/Onderzoeken.scss';

// Import from libraries
import { fetchData } from "@api";
import {formatDate} from "@services";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";

// import components
import {Button, LoadingDiv, OptionSelector} from "@components";


function Onderzoeken() {
    const [onderzoeken, setOnderzoeken] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



    const [bedrijfsGegevens, setBedrijfsGegevens] = useState({});
    const [selectedBedrijf, setSelectedBedrijf] = useState();
    const [bedrijfsOpties, setBedrijfsOpties] = useState(["Alle"]); // Begin met "Alle" als een optie



    const navigate = useNavigate();
    const goToOnderzoek = (id) => {
        navigate(`/onderzoek/${id}`);
    };

    useEffect(() => {
        // Voeg klasse toe aan body
        document.body.classList.add('body-special-color');

        // Verwijder klasse bij unmount
        return () => {
            document.body.classList.remove('body-special-color');
        };
    }, []);


    useEffect(() => {
        if(selectedBedrijf) {
            const gefilterdeOnderzoeken = onderzoeken.filter(o => bedrijfsGegevens[o.bedrijfId] === selectedBedrijf);
            setOnderzoeken(gefilterdeOnderzoeken);
        }
    }, [selectedBedrijf]);


    const fetchBedrijfGegevens = async (bedrijfId) => {
        try {
            const response = await fetchData(`/Gebruiker/${bedrijfId}`);
            return response.bedrijfsnaam; // Of een andere eigenschap die je nodig hebt van het bedrijf
        } catch (error) {
            console.error('Fout bij het ophalen van bedrijfsgegevens:', error);
            return null; // Of een passende foutafhandeling
        }
    };
    useEffect(() => {
        async function filterOnderzoeken() {
            if(selectedBedrijf === "Alle") {
                // Als "Alle" geselecteerd is, haal alle onderzoeken opnieuw op
                const alleOnderzoeken = await fetchData('/Onderzoek/list');
                setOnderzoeken(alleOnderzoeken);
            } else if(selectedBedrijf) {
                // Filter onderzoeken op basis van geselecteerd bedrijf
                const gefilterdeOnderzoeken = onderzoeken.filter(o => bedrijfsGegevens[o.bedrijfId] === selectedBedrijf);
                setOnderzoeken(gefilterdeOnderzoeken);
            }
        }

        filterOnderzoeken();
    }, [selectedBedrijf]);


    useEffect(() => {
        async function fetchAllOnderzoeken() {
            setIsLoading(true);
            try {
                let onderzoekenData = await fetchData('/Onderzoek/list');
                let uniekeBedrijfsIds = new Set(onderzoekenData.map(o => o.bedrijfId));
                let bedrijven = {};

                for (const id of uniekeBedrijfsIds) {
                    bedrijven[id] = await fetchBedrijfGegevens(id);
                }

                setBedrijfsGegevens(bedrijven);
                setBedrijfsOpties(["Alle", ...Object.values(bedrijven)]); // Voeg bedrijfsnamen toe na "Alle"
                setOnderzoeken(onderzoekenData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAllOnderzoeken();
    }, []);


    return (


        <main className="onderzoeken-page">
            <div className="onderzoek-tabel">
                <div className="onderzoek-info">
                    <div className="titel">
                        <div className="content-titel">Onderzoeken</div>
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
                        {onderzoeken.map(onderzoek => (
                            <div className="onderzoek-item" key={onderzoek.id}>
                                <div className="content-left">
                                    <div className="onderzoek-ttitel">{onderzoek.titel}</div>
                                    <div className="onderzoek-omschrijving">{onderzoek.omschrijving}</div>
                                </div>
                                <div className="content-right">
                                    <div className="content-tags">
                                        <p className="content-informatie-een">{onderzoek.status}</p>
                                        <p className="content-informatie">€{onderzoek.vergoeding}</p>
                                    </div>

                                    <p className="content-informatie">{onderzoek.status}</p>
                                    <p className="content-informatie">€{onderzoek.vergoeding}</p>
                                    <p className="content-informatie">{onderzoek.aantalParticipanten}</p>
                                    <p className="content-informatie">{onderzoek.locatie}</p>
                                    <div className="content-informatie">{formatDate(onderzoek.startDatum)}</div>
                                    <div className="button-div">
                                        <Button  className="onderzoek-button" onClick={() => goToOnderzoek(onderzoek.id)}> Onderzoek Info </Button>
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