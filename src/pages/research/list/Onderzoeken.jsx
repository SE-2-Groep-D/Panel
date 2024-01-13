import '@pagestyles/research/_research-list.scss';

// Import from libraries
import {fetchData} from "@api";
import {formatDate} from "@utils";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";

// import components
import {Button, LoadingDiv, OptionSelector} from "@components";
import {useAuth} from "@hooks";


function Onderzoeken() {
    const {userInfo} = useAuth();
    const [alleOnderzoeken, setAlleOnderzoeken] = useState([]);
    const [getoondeOnderzoeken, setGetoondeOnderzoeken] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bedrijfsGegevens, setBedrijfsGegevens] = useState({});
    const [selectedBedrijf, setSelectedBedrijf] = useState('Alle');
    const [bedrijfsOpties, setBedrijfsOpties] = useState(["Alle"]);
    const [selectedType, setSelectedType] = useState('Alle');
    const [onderzoekTypes, setOnderzoekTypes] = useState(["Alle", "vragenlijst", "websiteBezoek"]);
    const navigate = useNavigate();

    const goToOnderzoek = (id) => {
        navigate(`/onderzoek/${id}`);
    };
    const goToOnderzoekAanmaken = () => {
        navigate(`/onderzoek/aanmaken`);
    };


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
        const filterOnderzoeken = () => {
            let gefilterdeOnderzoeken = alleOnderzoeken;
            if (userInfo.userType === 'Bedrijf') {
                gefilterdeOnderzoeken = gefilterdeOnderzoeken.filter(o => o.bedrijfId === userInfo.id);
            }
            if (selectedBedrijf !== "Alle") {
                gefilterdeOnderzoeken = gefilterdeOnderzoeken.filter(o => bedrijfsGegevens[o.bedrijfId] === selectedBedrijf);
            }
            if (selectedType !== "Alle") {
                gefilterdeOnderzoeken = gefilterdeOnderzoeken.filter(o => o.type === selectedType);
            }
            return gefilterdeOnderzoeken;
        };

        setGetoondeOnderzoeken(filterOnderzoeken());
    }, [selectedBedrijf, selectedType, alleOnderzoeken, bedrijfsGegevens, userInfo]);


    const fetchBedrijfGegevens = async (bedrijfId) => {
        try {
            const response = await fetchData(`/Gebruiker/${bedrijfId}`);
            return response.bedrijfsnaam;
        } catch (error) {
            console.error('Fout bij het ophalen van bedrijfsgegevens:', error);
            return null;
        }
    };


    return (


        <main className='gray'>
            <div className="onderzoek-tabel">
                {
                    (userInfo.userType === 'Ervaringsdeskundige') ?
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
                                <OptionSelector
                                    onChange={(e) => setSelectedType(e.value)}
                                    options={onderzoekTypes}
                                    value={selectedType}
                                >
                                    Type Onderzoek
                                </OptionSelector>

                            </div>
                        </div>
                        : <div className="onderzoek-info">
                            <div className="titel">
                                <div className="content-titel heading-1">Onze Onderzoeken</div>
                            </div>
                        </div>
                }


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
                                        <p className="content-informatie tag">{onderzoek.type}</p>
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
                    {
                        (userInfo.userType === 'Bedrijf') ?
                            <div className="button-div">
                                <Button className="onderzoek-aanmaken-button"
                                        onClick={() => goToOnderzoekAanmaken()}> Maak een onderzoek aan </Button>
                            </div>
                            : null
                    }
                </div>
            </div>
        </main>

    );
}

export default Onderzoeken;