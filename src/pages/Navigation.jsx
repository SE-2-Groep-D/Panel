import {Link, useLocation} from "react-router-dom";
import {Logo, Button} from "@components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faMagnifyingGlass, faNewspaper, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "@hooks";
import {useState} from "react";

const hideNavigationRoutes  = [
    '/setup',
    '/login',
    '/register',
    '/privacy',
    '/onderzoek/aanmaken',
    '/onderzoek/:onderzoekId'
];

function Navigation() {
    const {authenticated, logoutUser, userInfo} = useAuth();
    const route = useLocation();

    if(hideNavigationRoutes.includes(route.pathname) || !authenticated) {
        return null;
    }

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return <nav className='navigation'>
        <input type={"checkbox"} id='navigation-checkbox' />

        <Link className='home' to='/'>
            <Logo small/>
        </Link>

        <ul className="navigation-items">
            <div className="links">
                <li className={`navigation-item ${isActive('/')}`}>
                    <Link to='/'>
                        <FontAwesomeIcon icon={faHome} />
                        Dashboard
                    </Link>
                </li>
                <li className={`navigation-item ${isActive('/onderzoek')}`}>
                    <Link to='/onderzoek'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        Onderzoeken
                    </Link>
                </li>



                {
                    (userInfo.userType !== 'Bedrijf') ?
                        <li className={`navigation-item ${isActive('/nieuwsbrief')}`}>
                            <Link to='/nieuwsbrief'>
                                <FontAwesomeIcon icon={faNewspaper} />
                                Nieuws
                            </Link>
                        </li>
                        : null
                }
            </div>

            <Button aria-label={'Log uit.'} className='logout' onClick={() => logoutUser()}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Uitloggen
            </Button>
        </ul>



        <div className="navigation-button">
            <label className='menu' htmlFor='navigation-checkbox'>
                <span className="menu-icon"></span>
            </label>
        </div>

    </nav>
}

export default Navigation;