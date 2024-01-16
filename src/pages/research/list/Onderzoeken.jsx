import '@pagestyles/research/_research-list.scss';

// Import from libraries
import {fetchData} from "@api";
import {formatDate} from "@utils";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useIntersectionObserver} from "@hooks";

// import components
import {Button, LoadingDiv, OptionSelector, ToolTip} from "@components";
import PropTypes from "prop-types";


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
        <main className='gray'>
            <section className="onderzoeken">
                <div className="onderzoek-info">
                    <div className="titel">
                        <h1 className="content-titel heading-1">Onderzoeken</h1>
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
                <LoadingDiv loading={isLoading} className='onderzoek-items'>
                    {getoondeOnderzoeken.map((onderzoek, key) =>
                        <Onderzoek key={key} onderzoek={onderzoek} goToOnderzoek={goToOnderzoek} bedrijfsGegevens={bedrijfsGegevens}/>
                    )}
                </LoadingDiv>
                {/* <div className="button-div">
                        <Button className="onderzoek-aanmaken-button"
                                onClick={() => goToOnderzoekAanmaken()}> Maak een onderzoek aan </Button>
                    </div>*/}
            </section>
        </main>

    );
}

function Onderzoek({onderzoek, goToOnderzoek, bedrijfsGegevens}) {
    const [ref, inView] = useIntersectionObserver();

    return (
        <li ref={ref} className={(inView) ? 'onderzoek moveIn bottom' : 'onderzoek'} key={onderzoek.id}>
            <div className="header">
                <h2 className="heading-2">{onderzoek.titel}</h2>
                <ul className="tags" aria-label='Onderzoeks informatie'>
                    <ToolTip message='Bedrijfsnaam'>
                        <li className="tag">{bedrijfsGegevens[onderzoek.bedrijfId]}</li>
                    </ToolTip>
                    <ToolTip message='Onderzoek vergoeding'>
                        <li className="tag">€{onderzoek.vergoeding}</li>
                    </ToolTip>
                </ul>
            </div>
            <div className="content">
                <div className="content-left">
                    <p className="text">{onderzoek.omschrijving}</p>
                </div>
                <div className="content-right">

                    <ul className="content-info" aria-label='Extra onderzoek informatie'>
                        <ToolTip message='Aantal deelnemers'>
                            <li className="text">{onderzoek.aantalParticipanten}</li>
                        </ToolTip>
                        <ToolTip message='Locatie'>
                            <li className="text">{onderzoek.locatie}</li>
                        </ToolTip>
                        <ToolTip message='Startdatum'>
                            <li className="text">{formatDate(onderzoek.startDatum)}</li>
                        </ToolTip>
                    </ul>
                    <div className="button-div">
                        <Button className="onderzoek-button"
                                onClick={() => goToOnderzoek(onderzoek.id)}> Onderzoek Info </Button>
                    </div>

                </div>
            </div>
        </li>
    );
}


export default Onderzoeken;