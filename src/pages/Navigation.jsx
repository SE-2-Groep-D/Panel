import {Link, useLocation} from "react-router-dom";
import {Icon, Logo, Button} from "@components";

const hideNavigationRoutes  = [
    '/setup',
    '/login',
    '/register'
];

function Navigation() {
    const route = useLocation();

    if(hideNavigationRoutes.includes(route.pathname)) {
        return null;
    }

    return <nav className='navigation'>
        <Link className='home' to='/'>
            <Logo small/>
        </Link>

        <ul className="navigation-items">
            <li className="navigation-item">
                <Link to='/'>
                    <Icon type='home' color='black' size={20}/>
                    Home
                </Link>
            </li>
            <li className="navigation-item active">
                <Link to='/onderzoek'>
                    <Icon type='research' color='black' size={20}/>
                    Onderzoeken
                </Link>
            </li>
        </ul>

        <Button aria-label={'profile'} className='profile-button'>
            <Icon type='profile' color='black' size={20}/>
            Profile
        </Button>
    </nav>
}

export default Navigation;