
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}
function Information({locatie,vergoeding,datum}) {
    

    return (
        <div className='information'>
            <div className="information-loction"> {locatie}:</div>
            <div className="information-vergoeding"> €{vergoeding}</div>
            <div className="information-datum"> {formatDate(datum)}</div>
      </div>
    );
    }
    
  export default Information;  