import React, {useRef} from 'react';
import {generateCustomId} from "../../utils/index.js";

export default function Checkbox({ children, id, value, onChange, required }) {
    id = (id !== null && id !== undefined)? id : generateCustomId(7);
    const checkboxRef = useRef();

    function handleChange() {
        const eventInfo = {
            element: checkboxRef.current,
            oldValue: value,
            value: checkboxRef.current.checked,
        };

        if (onChange !== undefined && onChange !== null) {
            onChange(eventInfo);
        }
    }

    return (
            <label htmlFor={id} className="checkbox" role="checkbox" aria-checked={value} tabIndex={0} onKeyDown={(e) => {
                if(e.key !== 'Enter') return;
                checkboxRef.current.checked = !checkboxRef.current.checked;
                handleChange()
            }}>
                <input
                    ref={checkboxRef}
                    id={id}
                    value={value}
                    checked={value}
                    onChange={handleChange}
                    type="checkbox"
                    className="checkbox-cb"
                    required={required}
                />
                {children && <span className="checkbox-text">{children}</span>}
                <span className="checkbox-mark"></span>
            </label>
    );
}
