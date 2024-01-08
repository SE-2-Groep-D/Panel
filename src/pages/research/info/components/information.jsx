import {formatDate} from '@services'

function Information({locatie,vergoeding,datum}) {
    

    return (
        <div className='information'>
            <div className="information-location"> {locatie}</div>
            <div className="information-vergoeding"> €{vergoeding}</div>
            <div className="information-datum"> {formatDate(datum)}</div>
      </div>
    );
    }
    
  export default Information;  