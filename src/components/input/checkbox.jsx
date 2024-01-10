import PropTypes from 'prop-types';

export default function Checkbox({children, id, value, onChange, required}) {
      const text = (children) ?
      <span className="checkbox-text">{children}</span>
      : null;

      function handleChange(e) {
          if(onChange !== undefined && onChange !== null) onChange({
              element: e.target.parentNode.parentNode,
              oldValue: value,
              value: e.target.checked,
          });
      }

      

  return (<div className="checkbox" value={value} id={id}>
             {text}
            <label className="checkbox-label">
            <input value={value} checked={(value)} onChange={handleChange} type="checkbox" className='checkbox-cb' required={required}/>
            <span className="checkbox-mark"></span>
            </label>
        </div>
  )
}

Checkbox.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};


