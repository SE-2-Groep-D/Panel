import FormatDate from "@pages/research/components/formDate.jsx";

function Information({locatie,vergoeding,datum}) {
    

    return (
        <div className='information'>
            <div className="information-loction"> {locatie}:</div>
            <div className="information-vergoeding"> €{vergoeding}</div>
            <div className="information-datum"> {FormatDate(datum)}</div>
      </div>
    );
    }
    
  export default Information;  