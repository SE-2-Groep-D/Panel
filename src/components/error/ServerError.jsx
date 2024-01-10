import '@pagestyles/error/ServerError.scss'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonCircleXmark} from "@fortawesome/free-solid-svg-icons";

export default function ServerError({message}) {
    message = (message) ? message : 'Er is helaas iets fout gegaan bij de server, probeer het later opnieuw.';

    return (<main className='server-error gray'>
        <FontAwesomeIcon icon={faPersonCircleXmark} className='person-icon'/>
        <h1 className='heading-1'>Oeps, er is iets fout gegaan.</h1>
        <p className='text'>{message}</p>
    </main>);
}