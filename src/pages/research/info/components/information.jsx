import {formatDate} from '@utils'
import {ToolTip} from "@components";

function Information({locatie, vergoeding, datum}) {


    return (
        <ul className='information' aria-label='Extra onderzoek informatie.'>
            <ToolTip message="Locatie">
                <li className="information-tag tag">{locatie}</li>
            </ToolTip>
            <ToolTip message="Vergoeding">
                <li className="information-tag tag"> €{vergoeding}</li>
            </ToolTip>
            <ToolTip message="Datum">
                <li className="information-tag tag"> {formatDate(datum)}</li>
            </ToolTip>




        </ul>
    );
}

export default Information;