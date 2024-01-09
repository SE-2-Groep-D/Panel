import {Link, useLocation} from "react-router-dom";
import {Logo, Button} from "@components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "@hooks";

const hideNavigationRoutes  = [
    '/setup',
    '/login',
    '/register',
    '/privacy'
];

function Navigation() {
    const {authenticated} = useAuth();
    const route = useLocation();

    if(hideNavigationRoutes.includes(route.pathname) || !authenticated) {
        return null;
    }

    return <nav className='navigation'>
        <Link className='home' to='/'>
            <Logo small/>
        </Link>

        <ul className="navigation-items">
            <li className="navigation-item">
                <Link to='/'>
                    <FontAwesomeIcon icon={faHome} />
                    Dashboard
                </Link>
            </li>
            <li className="navigation-item active">
                <Link to='/onderzoek'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    Onderzoeken
                </Link>
            </li>
        </ul>

        <Button aria-label={'profile'} className='profile-button'>
            <FontAwesomeIcon icon={faUser} />
            Profile
        </Button>
    </nav>
}

export default Navigation;