import "@pagestyles/research/_research-info.scss";

import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {fetchApi, fetchData, hasPermission, Role} from "@api";

// import components
import OnderzoekInformatie from "./components/OnderzoekInformatie";
import Information from "./components/information";
import Map from "./components/map";
import {Button, LoadingDiv, ToolTip} from "@components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faPencil, faStop, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useAuth, useChat} from "@hooks";
import DynamicModal from "@pages/research/componenten/DynamicModal.jsx";

function OnderzoekInfo() {
    const {userInfo} = useAuth();
    const {setBedrijfId} = useChat();
    const {onderzoekId} = useParams();
    const [onderzoek, setOnderzoek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAlIngeschreven, setIsAlIngeschreven] = useState(false);
    const [bedrijf, setBedrijf] = useState(null);
    const [bedrijfsCoordinaten, setBedrijfsCoordinaten] = useState(null);
    const navigate = useNavigate();

    const [resultaten, setResultaten] = useState([]);
    //for cal back
    const [updatedTitel, setUpdatedTitel] = useState("");
    const [updatedOmschrijving, setUpdatedOmschrijving] = useState("");
    const [updatedLocatie, setUpdatedLocatie] = useState("");
    const [updatedVergoeding, setUpdatedVergoeding] = useState("");
    const [updatedDatum, setUpdatedDatum] = useState("");
    const [geselecteerdeVragenlijstId, setGeselecteerdeVragenlijstId] =
        useState(null);
    const [vragenlijsten, setVragenlijsten] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    //for melding
    const [showInscriptionModal, setShowInscriptionModal] = useState(false);
    const [inscriptionMessage, setInscriptionMessage] = useState("");

    const updatePermission = hasPermission(Role.Bedrijf);

    const goToVragenlijst = (id) => {
        navigate(`/vragenlijst/${id}`);
    };
    const goToHome = () => {
        navigate(`/`);
    };
    const goToOnderzoekResultaten = (id) => {
        navigate(`/onderzoek/${id}/results`);
    };

    const goToBewerkVragenlijst = (id) => {
        navigate(`/vragenlijst/${id}/bewerken`);
    };

    const goToCompanyWebsite = (url) => {
        window.location.href = url;
    };

    const OnderzoekVerwijderen = async (id) => {
        try {
            const response = await fetchApi(`/Onderzoek/delete/${id}`, "DELETE");
            if (response) {
                setInscriptionMessage("Onderzoek succesvol verwijderd!");
                setShowInscriptionModal(true);
                goToHome();
                return true;
            }
        } catch (error) {
            setInscriptionMessage(`Er is een fout optreden tijdens Verwijderen.`);
            setShowInscriptionModal(true);
        }
    };

    const OnderzoekEindigen = async (id) => {
        const data = {
            status: "ended",
        };
        try {
            const response = await fetchApi(`/Onderzoek/update/${id}`, "PUT", data);
            if (response) {
                setInscriptionMessage("Onderzoek succesvol beëindigd!");
                setShowInscriptionModal(true);
                return true;
            }
        } catch (error) {
            setInscriptionMessage(`Er is een fout optreden tijdens beëindigen.`);
            setShowInscriptionModal(true);
        }
    };

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
            datum: date,
        };
        try {
            const responseText = await fetchApi(
                "/Onderzoek/registration",
                "POST",
                data
            );
            if (responseText === "Registratie is aangemaakt.") {
                setIsAlIngeschreven(true);
                setInscriptionMessage("U bent succesvol ingeschreven!");
                setShowInscriptionModal(true);
                return true;
            } else {
                setInscriptionMessage("Inschrijving mislukt. Probeer het opnieuw.");
                setShowInscriptionModal(true);
                return false;
            }
        } catch (error) {
            setInscriptionMessage(`Fout tijdens inschrijving: ${error.message}`);
            setShowInscriptionModal(true);
            return false;
        }
    };

    useEffect(() => {
        const controleerInschrijving = async () => {
            if (!onderzoek || !userInfo || userInfo.userType !== 'Ervaringsdeskundige') {
                return;
            }

            try {
                const response = await fetchData(
                    `/Onderzoek/registration/list/${onderzoek.id}`
                );
                const isIng = response.some(
                    (reg) => reg.ervaringsdeskundigeId === userInfo.id
                );
                setIsAlIngeschreven(isIng);
            } catch (error) {

                console.error("Fout bij ophalen registraties:", error);
            }
        };

        controleerInschrijving();
    }, [onderzoek, userInfo]);

    const getCoordinatesForAddress = async (address) => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                address
            )}&format=json&limit=1`
        );
        const data = await response.json();

        if (!data.length) throw new Error("Address not found");

        const {lat, lon: lng} = data[0];
        return {lat, lng};
    };

    useEffect(() => {
        const fetchOnderzoekInfo = async () => {
            if (!onderzoekId) return;
            try {
                const onderzoekData = await fetchData(`/Onderzoek/${onderzoekId}`);
                setOnderzoek(onderzoekData);
                if (onderzoek) {
                    await getResultaten()
                }
                const vragenlijstData = await fetchData(
                    `/Vragenlijst?onderzoekId=${onderzoekId}`
                );
                if (vragenlijstData) {
                    setVragenlijsten(vragenlijstData);
                }
                if (!onderzoekData?.bedrijfId) return;

                const bedrijfData = await fetchData(
                    `/Gebruiker/${onderzoekData.bedrijfId}`
                );
                if (!bedrijfData) return;

                setBedrijf(bedrijfData);
                setBedrijfId(bedrijfData.id);

                const {straat, nummer, postcode, plaats} = bedrijfData;
                if (!postcode || !plaats || !nummer || !postcode) return;

                const fullAddress = `${straat} ${nummer}, ${postcode}, ${plaats}`;
                const coordinates = await getCoordinatesForAddress(fullAddress);
                setBedrijfsCoordinaten(coordinates || {});
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOnderzoekInfo();
    }, [onderzoekId]);


    useEffect(() => {
        const getResultaten = async () => {
            if (!onderzoek) return;
            console.log(onderzoek);
            try {
                const data = await fetchData(`/Resultaten/${onderzoek.id}`);
                console.log(data);
                setResultaten(data);
            } catch (error) {
                console.log(error);
            }
        };

        getResultaten();
    }, [onderzoek]);

    const handleEditModeToggle = () => {
        if (isEditMode) {
            handleSave();
        }
        setIsEditMode(!isEditMode);
    };

    const handleSave = async () => {
        let updatedData = {};

        if (updatedTitel) updatedData.titel = updatedTitel;
        if (updatedOmschrijving) updatedData.omschrijving = updatedOmschrijving;
        if (updatedLocatie) updatedData.locatie = updatedLocatie;
        if (updatedVergoeding) updatedData.vergoeding = updatedVergoeding;
        if (updatedDatum) updatedData.datum = updatedDatum;

        setIsEditMode(!isEditMode);
        try {
            const updatedondezoek = await fetchApi(
                `/Onderzoek/update/${onderzoekId}`,
                "PUT",
                updatedData
            );
            setOnderzoek(updatedondezoek);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <main>
            <LoadingDiv loading={loading} className="container">
                {onderzoek && (
                    <>
                        <div className="content-left-container">
                            <div className="navigation">
                                <a href={`/onderzoek/`} className="back">
                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                    Terug
                                </a>
                            </div>
                            <OnderzoekInformatie
                                titel={onderzoek.titel}
                                omschrijving={onderzoek.omschrijving}
                                bedrijf={bedrijf}
                                isEditable={isEditMode}
                                userInfo={userInfo}
                                onUpdate={(titel, omschrijving) => {
                                    setUpdatedTitel(titel);
                                    setUpdatedOmschrijving(omschrijving);
                                }}
                            />

                            {updatePermission ? (
                                <div className="button-onderzoekinfo">
                                    <div className="button-onderzoekinfo-1">
                                        {
                                            (isEditMode) ?
                                                <Button onClick={handleEditModeToggle}>
                                                    Opslaan
                                                </Button>
                                                : null
                                        }
                                    </div>
                                    {isEditMode ? null : (
                                        <div className="button-onderzoekinfo">
                                            {
                                                vragenlijsten && vragenlijsten.length > 0 ? (
                                                    <div>
                                                        <Button
                                                            className="onderzoek-vragenlijst"
                                                            onClick={() => goToBewerkVragenlijst(geselecteerdeVragenlijstId)}
                                                        >
                                                            Vragenlijst Bewerken
                                                        </Button>
                                                    </div>
                                                ) : null
                                            }
                                            <div>
                                                <Button
                                                    className="onderzoek-resultaten"
                                                    onClick={() => goToOnderzoekResultaten(onderzoek.id)}
                                                >
                                                    Bekijk resultaten
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : isAlIngeschreven ? (
                                <div className="button-onderzoekinfo-ervaringsdeskundige">
                                    {resultaten && resultaten.questionList && resultaten.questionList.length > 0 && (

                                        <div className="button-onderzoekinfo-2">
                                            <Button
                                                className="onderzoek-vragenlijst"
                                                onClick={() => goToVragenlijst(geselecteerdeVragenlijstId)}
                                            >
                                                Start Vragenlijst
                                            </Button>
                                        </div>
                                    )}
                                    {resultaten && resultaten.trackingResearches && resultaten.trackingResearches.length > 0 && (

                                        < div>
                                            <Button
                                                className="start-website-onderzoek"
                                                onClick={() => goToCompanyWebsite(onderzoek.websiteUrl)}
                                            >
                                                Start website onderzoek
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {(resultaten.questionList && resultaten.questionList.length > 0) ||
                                    (resultaten.trackingResearches && resultaten.trackingResearches.length > 0) ? (
                                        <div className="button-onderzoekinfo">
                                            <Button
                                                className="onderzoek-Inschrijven"
                                                onClick={() => Inschrijven(onderzoek.id, userInfo.id)}
                                            >
                                                Inschrijven
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-small button-onderzoekinfo">
                                            Er is momenteel geen vragenlijst of tracking onderzoek beschikbaar voor dit
                                            onderzoek.
                                        </div>
                                    )}
                                </>


                            )}
                        </div>
                        <div className="content-right-container">
                            {updatePermission ? (
                                <div className="interactie-knop">
                                    {
                                        (isEditMode) ? null :
                                            <ToolTip message="Bewerk onderzoek">
                                                <Button
                                                    label="Klik op deze knop om Onderzoek te bewerken."
                                                    varient="text"
                                                    onClick={() => setIsEditMode(true)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPencil}
                                                        style={{color: "black"}}
                                                    />
                                                </Button>
                                            </ToolTip>
                                    }

                                    <ToolTip message="Beëindig onderzoek">
                                        <Button
                                            label="Klik op deze knop om Onderzoek te eindigen."
                                            varient="text"
                                            onClick={() => OnderzoekEindigen(onderzoekId)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faStop}
                                                style={{color: "black"}}
                                            />
                                        </Button>
                                    </ToolTip>

                                    <ToolTip message='Verwijder onderzoek'>
                                        <Button
                                            label="Klik op deze knop om Onderzoek te verwijderen."
                                            onClick={() => OnderzoekVerwijderen(onderzoekId)}
                                            varient="text"
                                            color="tertiary"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                style={{color: "black"}}
                                            />
                                        </Button>
                                    </ToolTip>
                                </div>
                            ) : null}

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
                                }}
                            />
                            {bedrijfsCoordinaten && (
                                <Map coordinates={bedrijfsCoordinaten} bedrijf={bedrijf}/>
                            )}
                        </div>
                    </>
                )}
            </LoadingDiv>
            <DynamicModal
                isOpen={showInscriptionModal}
                message={inscriptionMessage}
                onClose={() => setShowInscriptionModal(false)}
            />
        </main>
    );
}

export default OnderzoekInfo;
