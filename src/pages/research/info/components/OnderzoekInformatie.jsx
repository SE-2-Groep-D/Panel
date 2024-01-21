import {useEffect, useState} from "react";
import DOMPurify from 'dompurify';
function OnderzoekInformatie({ titel, omschrijving, bedrijf, isEditable,onUpdate }) {
    const [editableTitel, setEditableTitel] = useState(titel);
    const [editableOmschrijving, setEditableOmschrijving] = useState(omschrijving);

    const handleTitelChange = (e) => {
        const newTitel = DOMPurify.sanitize(e.currentTarget.innerText);
        setEditableTitel(newTitel);
        onUpdate(newTitel, editableOmschrijving);
    };

    const handleOmschrijvingChange = (e) => {
        const newOmschrijving = DOMPurify.sanitize(e.currentTarget.innerText);
        setEditableOmschrijving(newOmschrijving);
        onUpdate(editableTitel, newOmschrijving);
    };

    return (
        <div className="research-information">
            <header className="header">
                <h1 className="heading-1"
                    contentEditable={isEditable}
                    onBlur={handleTitelChange}
                    dangerouslySetInnerHTML={{__html: editableTitel}}/>
            </header>
            <section className="section">
                <h2 className="heading-3">Over onderzoek</h2>
                <p className="text"
                   contentEditable={isEditable}
                   onBlur={handleOmschrijvingChange}
                   dangerouslySetInnerHTML={{__html: editableOmschrijving}}/>
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
