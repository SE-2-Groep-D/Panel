import {formatDate} from '@services'

function Information({locatie, vergoeding, datum}) {


    return (
        <div className='information'>
            <div className="information-tag tag"> {locatie}</div>
            <div className="information-tag tag"> €{vergoeding}</div>
            <div className="information-tag tag"> {formatDate(datum)}</div>
        </div>
    );
}

export default Information;