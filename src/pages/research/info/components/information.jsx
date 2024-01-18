import DOMPurify from 'dompurify';
import { useState, useCallback } from 'react';
import { formatDate } from '@utils';

function Information({ locatie, vergoeding, datum, isEditable, onUpdate }) {
    const [editableLocatie, setEditableLocatie] = useState(locatie);
    const [editableVergoeding, setEditableVergoeding] = useState(vergoeding);
    const [editableDatum, setEditableDatum] = useState(datum);

    const handleLocatieChange = useCallback((e) => {
        const newLocatie = DOMPurify.sanitize(e.currentTarget.innerText);
        setEditableLocatie(newLocatie);
        onUpdate(newLocatie, editableVergoeding, editableDatum);
    }, [editableVergoeding, editableDatum, onUpdate]);

    const handleVergoedingChange = useCallback((e) => {
        const newVergoeding = DOMPurify.sanitize(e.currentTarget.innerText);
        setEditableVergoeding(newVergoeding);
        onUpdate(editableLocatie, newVergoeding, editableDatum);
    }, [editableLocatie, editableDatum, onUpdate]);

    const handleDatumChange = useCallback((e) => {
        const newDatum = DOMPurify.sanitize(e.currentTarget.innerText);
        setEditableDatum(newDatum);
        onUpdate(editableLocatie, editableVergoeding, newDatum);
    }, [editableLocatie, editableVergoeding, onUpdate]);

    return (
        <div className='information'>
            <div
                className="information-tag tag"
                contentEditable={isEditable}
                onBlur={handleLocatieChange}
                dangerouslySetInnerHTML={{ __html: editableLocatie }}
                suppressContentEditableWarning={true}>
            </div>
            <div
                className="information-tag tag"
                contentEditable={isEditable}
                onBlur={handleVergoedingChange}
                dangerouslySetInnerHTML={{ __html: editableVergoeding }}
                suppressContentEditableWarning={true}>
            </div>
            <div
                className="information-tag tag"
                contentEditable={isEditable}
                onBlur={handleDatumChange}
                dangerouslySetInnerHTML={{ __html: formatDate(editableDatum) }}
                suppressContentEditableWarning={true}>
            </div>
        </div>
    );
}

export default Information;
