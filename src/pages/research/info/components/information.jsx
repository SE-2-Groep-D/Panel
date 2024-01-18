import {formatDate} from '@utils'
import {useEffect, useState} from "react";
function Information({ locatie, vergoeding, datum, isEditable }) {
    const [editableLocatie, setEditableLocatie] = useState(locatie);
    const [editableVergoeding, setEditableVergoeding] = useState(vergoeding);
    const [editableDatum, setEditableDatum] = useState(datum);


    const handleLocatieChange = (e) => {
        setEditableLocatie(e.target.innerText);
    };

    const handleVergoedingChange = (e) => {
        setEditableVergoeding(e.target.innerText);
    };

    const handleDatumChange = (e) => {
        setEditableDatum(e.target.innerText);
    };

    return (
        <div className='information'>
            <div
                className="information-tag tag"
                contentEditable={isEditable}
                onBlur={handleLocatieChange}
                suppressContentEditableWarning={true}>
                {editableLocatie}
            </div>
            <div
                className="information-tag tag"
                contentEditable={isEditable}
                onBlur={handleVergoedingChange}
                suppressContentEditableWarning={true}>
                €{editableVergoeding}
            </div>
            <div
                className="information-tag tag"
                contentEditable={isEditable}
                onBlur={handleDatumChange}
                suppressContentEditableWarning={true}>
                {formatDate(editableDatum)}
            </div>
        </div>
    );
}

export default Information;