import {useState} from 'react'

export default function Switch({onChange, id, required}) {
    const [value, setValue] = useState('on');

    function handleChange(e) {
        if(onChange !== undefined && onChange !== null) onChange({
            element: e.target.parentNode.parentNode,
            oldValue: value,
            value: e.target.checked,
        });
        setValue((e.target.checked)? 'on' : 'off');
    }

  return (
    <switch-field value={value} id={id}>
        <label className="switch">
            <input type="checkbox"  onChange={handleChange} className="switch-cb"/>
            <span className='switch-button'></span>
        </label>
    </switch-field>
  )
}
