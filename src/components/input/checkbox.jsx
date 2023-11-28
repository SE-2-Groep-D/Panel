

export default function Checkbox({children, name, onChange}) {
      const text = (children) ?  
      <span className="checkbox-text">{children}</span>
      : null;

      

  return (<div className="checkbox">
             {text}
            <label className="checkbox-label">
              <input onChange={onChange} type="checkbox" className='checkbox-cb'/>
              <span className="checkbox-mark"></span>
            </label>
        </div>
  )
}


