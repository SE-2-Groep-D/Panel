import {useState} from "react";

export default function Checkbox({children, id, onChange}) {
    const [value, setValue] = useState(false);


      const text = (children) ?  
      <span className="checkbox-text">{children}</span>
      : null;

      function handleChange(e) {
          setValue(e.target.checked);
          if(onChange !== undefined && onChange !== null) onChange({
              element: e.target.parentNode.parentNode,
              oldValue: value,
              value: e.target.checked,
          });
      }
      

  return (<check-box className="checkbox" value={value} id={id}>
             {text}
            <label className="checkbox-label">
              <input onChange={handleChange} type="checkbox" className='checkbox-cb'/>
              <span className="checkbox-mark"></span>
            </label>
        </check-box>
  )
}


