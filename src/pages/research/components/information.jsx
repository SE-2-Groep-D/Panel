
function Information({locatie,vergoeding,datum}) {
    

    return (
        <div className='information'>
            <div> {locatie}:</div>
            <div>€{vergoeding}</div>
            <div>{datum}</div>
      </div>
    );
    }
    
  export default Information;  