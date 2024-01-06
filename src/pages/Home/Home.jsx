import "@pagestyles/Home.scss";

import React from 'react';
import {Logo} from "@components";
import {Link} from "react-router-dom";

function Home(props) {
    return (
        <>
            <nav className="navigation">
                <Link className='logo' to='/'>
                    <Logo/>
                </Link>

                <ul className="navigation-items">
                    <li className="navigation-item">
                        <Link to='/login' className='login'>
                            Login
                        </Link>
                    </li>
                    <li className="navigation-item">
                        <Link to='/register' className='register'>
                            Register
                        </Link>
                    </li>
                </ul>
            </nav>

            <main className='content'>
                <section className='header'>
                    <div className='cta'>
                        <h1 className='heading-1'>Werk samen met ons aan een samenleving toegankelijk voor iedereen.</h1>
                        <Link to='/register' className='register'>
                            Meld je nu aan bij ons panel.
                        </Link>
                    </div>

                    <img className='accessibility-image' alt='Foto van een ' src="/src/assets/home-page.png"/>
                </section>
            </main>
        </>
    );
}

export default Home;