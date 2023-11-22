

export default function Checkbox({children, name}) {
      const text = (children) ?  
      <span className="checkbox-text">{children}</span>
      : null;

      

  return (<div className="checkbox">
             {text}
            <label className="checkbox-label">
              <input type="checkbox" className='checkbox-cb'/>
              <span className="checkbox-mark"></span>
            </label>
        </div>
  )
}


