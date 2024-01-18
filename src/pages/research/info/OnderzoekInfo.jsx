import '@pagestyles/research/_research-info.scss';

import {useEffect, useState} from "react";

import {useNavigate, useParams} from 'react-router-dom';
import {fetchApi, fetchData} from "@api";

// import components
import OnderzoekInformatie from "./components/OnderzoekInformatie";
import Information from './components/information';
import Map from "./components/map";
import {Button, LoadingDiv} from "@components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "@hooks";


function OnderzoekInfo() {
    const {userInfo} = useAuth();
    const {onderzoekId} = useParams();
    const [onderzoek, setOnderzoek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAlIngeschreven, setIsAlIngeschreven] = useState(false);
    const [melding, setMelding] = useState('');
    const [bedrijf, setBedrijf] = useState(null);
    const [bedrijfsCoordinaten, setBedrijfsCoordinaten] = useState(null);
    const navigate = useNavigate();

    const [updatedTitel, setUpdatedTitel] = useState("");
    const [updatedOmschrijving, setUpdatedOmschrijving] = useState("");
    const [updatedLocatie, setUpdatedLocatie] = useState("");
    const [updatedVergoeding, setUpdatedVergoeding] = useState("");
    const [updatedDatum, setUpdatedDatum] = useState("")
    const [geselecteerdeVragenlijstId, setGeselecteerdeVragenlijstId] = useState(null);

    const [vragenlijsten, setVragenlijsten] = useState([]);


    const [isEditMode, setIsEditMode] = useState(false);
    const goToVragenlijst = (id) => {
        navigate(`/vragenlijst/${id}`);
    };
    const goToOnderzoekResultaten = (id) => {
        navigate(`/onderzoek/${id}/results`);
    };

    //verzenden naar website

    useEffect(() => {
        if (vragenlijsten.length === 1) {
            setGeselecteerdeVragenlijstId(vragenlijsten[0].id);
        }
    }, [vragenlijsten]);

    const Inschrijven = async (onderzoekId, ervaringsdeskundigeId) => {
        var date = new Date().toISOString();
        const data = {
            onderzoekId: onderzoekId,
            ervaringsdeskundigeId: ervaringsdeskundigeId,
            datum: date
        };
        try {
            const responseText = await fetchApi("/Onderzoek/registration", "POST", data)
            if (responseText === "Registratie is aangemaakt.") {
                setIsAlIngeschreven(true);
                setMelding('Inschrijving succesvol!');
                return true;
            } else {
                setMelding('Inschrijving mislukt. Probeer het opnieuw.');
                return false;
            }
        } catch (error) {
            setMelding(`Fout tijdens inschrijving: ${error.message}`);
            return false;
        }
    };


    useEffect(() => {
        const controleerInschrijving = async () => {
            if (!onderzoek || !userInfo) {
                return;
            }
            try {
                const response = await fetchData(`/Onderzoek/registration/list/${onderzoek.id}`);
                const isIng = response.some(reg => reg.ervaringsdeskundigeId === userInfo.id);
                setIsAlIngeschreven(isIng);
            } catch (error) {
                console.error('Fout bij ophalen registraties:', error);
            }
        };

        controleerInschrijving();
    }, [onderzoek, userInfo]);


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

                const vragenlijstData = await fetchData(`Vragenlijst?onderzoekId=${onderzoekId}`);
                if (vragenlijstData) {
                    setVragenlijsten(vragenlijstData);
                }
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


    const handleEditModeToggle = () => {
        if (isEditMode) {
            // If currently in edit mode, save changes
            handleSave();
        }
        // Toggle edit mode state
        setIsEditMode(!isEditMode);
    };

    const handleSave = async () => {

        let updatedData = {};

        if (updatedTitel) updatedData.titel = updatedTitel;
        if (updatedOmschrijving) updatedData.omschrijving = updatedOmschrijving;
        if (updatedLocatie) updatedData.locatie = updatedLocatie;
        if (updatedVergoeding) updatedData.vergoeding = updatedVergoeding;
        if (updatedDatum) updatedData.datum = updatedDatum;

        console.log(updatedData);
        setIsEditMode(!isEditMode);
        try {
            const updatedondezoek = await fetchApi(`/Onderzoek/update/${onderzoekId}`, "PUT", updatedData)
            setOnderzoek(updatedondezoek);
            console.log(updatedondezoek)
        } catch (error) {
            console.error('Error:', error);
        }
    }


    if (!onderzoek && !loading) {
        return <p>Onderzoek niet gevonden.</p>;
    }
    return (
        <main>
            <LoadingDiv loading={loading} className='container'>
                    {onderzoek && (
                        <>
                            <div className="content-left-container">
                                <div className='navigation'>
                                    <a href={`/onderzoek/`} className='back'>
                                        <FontAwesomeIcon icon={faChevronLeft}/>
                                        Terug
                                    </a>
                                </div>
                                <OnderzoekInformatie titel={onderzoek.titel}
                                                     omschrijving={onderzoek.omschrijving}
                                                     bedrijf={bedrijf}
                                                     isEditable={isEditMode}
                                                     userInfo={userInfo}
                                                     onUpdate={(titel, omschrijving) => {
                                                         setUpdatedTitel(titel);
                                                         setUpdatedOmschrijving(omschrijving);
                                                     }}/>

                                {
                                    (userInfo.userType === 'Medewerker' || userInfo.userType === 'Bedrijf') ?
                                        <div className="button-onderzoekinfo">
                                            <div className="button-onderzoekinfo-1">
                                                <Button onClick={handleEditModeToggle}>
                                                    {isEditMode ? 'Opslaan' : 'Bewerken'}
                                                </Button>
                                            </div>
                                            {isEditMode ? null :
                                                <div className="button-onderzoekinfo">
                                                    <div>
                                                        <Button className="onderzoek-vragenlijst"
                                                                onClick={() => goToOnderzoekResultaten(onderzoek.id)}>Vragenlijst Toevegoen
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        <Button className="onderzoek-resultaten"
                                                                onClick={() => goToOnderzoekResultaten(onderzoek.id)}>Bekijk resultaten
                                                        </Button>
                                                    </div>

                                                </div>
                                            }
                                        </div>
                                        :
                                        isAlIngeschreven ? (
                                            <div className="button-onderzoekinfo-ervaringsdeskundige">
                                                {melding && <div className="melding">{melding}</div>}
                                                <div className="button-onderzoekinfo-2">
                                                    <Button className="onderzoek-vragenlijst"
                                                            onClick={() => goToVragenlijst(geselecteerdeVragenlijstId)}>Start
                                                        Vragenlijst</Button>

                                                </div>
                                                <div>
                                                    <Button className="start-website-onderzoek"
                                                            onClick={() => goToOnderzoekResultaten(onderzoek.id)}>Start
                                                        website onderzoek</Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {vragenlijsten.length === 0 &&
                                                    <div className="text-small">
                                                        Er is momenteel geen vragenlijst beschikbaar voor dit onderzoek.
                                                    </div>
                                                }

                                                {vragenlijsten.length === 1 &&
                                                    <div>
                                                        <Button className="onderzoek-Inschrijven"
                                                                onClick={() => Inschrijven(onderzoek.id, userInfo.id, vragenlijsten[0].id)}>Inschrijven
                                                            voor vragenlijst</Button>
                                                    </div>
                                                }

                                                {vragenlijsten.length > 1 &&
                                                    <select
                                                        onChange={(e) => Inschrijven(onderzoek.id, userInfo.id, e.target.value)}>
                                                        {vragenlijsten.map((vragenlijst) => (
                                                            <option key={vragenlijst.id} value={vragenlijst.id}>
                                                                Inschrijven voor {vragenlijst.titel}
                                                            </option>
                                                        ))}
                                                    </select>
                                                }
                                            </>
                                        )
                                }

                            </div>
                            <div className="content-right-container">
                                <Information
                                    locatie={onderzoek.locatie}
                                    vergoeding={onderzoek.vergoeding}
                                    datum={onderzoek.startDatum}
                                    isEditable={isEditMode}
                                    userInfo={userInfo}
                                    onUpdate={(locatie, vergoeding, datum) => {
                                        setUpdatedLocatie(locatie);
                                        setUpdatedVergoeding(vergoeding);
                                        setUpdatedDatum(datum);
                                    }}/>
                                {bedrijfsCoordinaten && <Map coordinates={bedrijfsCoordinaten} bedrijf={bedrijf}/>}
                            </div>
                        </>
                    )}
            </LoadingDiv>
        </main>

    );
}

export default OnderzoekInfo;
