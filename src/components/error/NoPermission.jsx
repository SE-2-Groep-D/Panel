import '@pagestyles/error/_server-error.scss'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonCircleExclamation} from "@fortawesome/free-solid-svg-icons";

export default function NoPermission({message}) {
    message = (message) ? message : 'U heeft helaas geen toegang to deze pagina.';

    return (<main className='server-error gray'>
        <FontAwesomeIcon icon={faPersonCircleExclamation} className='person-icon'/>
        <h1 className='heading-1'>Geen toegang</h1>
        <p className='text'>{message}</p>
    </main>);
}

export {NoPermission}