import {useEffect, useState} from "react";
function OnderzoekInformatie({ titel, omschrijving, bedrijf, isEditable }) {
    const [editableTitel, setEditableTitel] = useState(titel);
    const [editableOmschrijving, setEditableOmschrijving] = useState(omschrijving);
    // Handlers for changes in content

    const handleTitelChange = (e) => {
        setEditableTitel(e.target.innerText);
    };

    const handleOmschrijvingChange = (e) => {
        setEditableOmschrijving(e.target.innerText);
    };

    return (
        <div className="research-information">
            <header className="header">
                <h1 className="heading-1"      contentEditable={isEditable} onBlur={handleTitelChange}> {editableTitel}</h1>
            </header>
            <section className="section">
                <h2 className="heading-3">Over onderzoek</h2>
                <p className="text"     contentEditable={isEditable} onBlur={handleOmschrijvingChange}> {editableOmschrijving}</p>
            </section>
            <section className="section">
                <h2 className="heading-3">Over bedrijf</h2>
                {/* Controleer of bedrijf een waarde heeft voordat je probeert de omschrijving te renderen */}
                <p className="text">{bedrijf ? bedrijf.omschrijving : 'Laden...'}</p>
            </section>

        </div>
    );
}

export default OnderzoekInformatie;
