import "@pagestyles/home/default.scss";

import React, { Suspense, lazy, useState } from 'react'
import PropTypes from 'prop-types';

import {LoadingDiv, CountingAnimation} from '@components';
import BedrijfAgenda from "./BedrijfAgenda";

const Agenda = lazy(() => import('./Agenda.jsx'));
const CompanyAgenda = lazy(() => import('./BedrijfAgenda.jsx'));

export default function DashboardData({message}) {
    const [data, setData] = useState(
        {
            type: 'Ervaringsdeskundige',
            message: 'test',
            statistics: [{title: 'Ingeschreven opdrachten', value: 3}, {title: 'Voltooide opdrachten', value: 10}],
            agenda: [
                {
                    company: 'Google',
                    title: 'Locatie bezoek',
                    date: '10-01-2024'
                },
                {
                    company: 'Facebook',
                    title: 'Website bezoek',
                    date: '30-01-2024'
                }, 
                {
                    company: 'Microsoft',
                    title: 'Curus',
                    date: '5-02-2024'
                }
            ]
        }
    );
    
    if(data === null) {
        return <h1 className='heading-2 not-found'>Oeps er is iets fout gegaan tijdens het ophalen van de gebruikers data.</h1>
    }

    if(data instanceof Error) {
        return <h1 className='heading-2 not-found'>Er is een fout opgetreden tijdens het ophalen van de resultaten.</h1>
    }

    if(data === undefined) {
        return <LoadingDiv loading />;
    }

  return (
    <>
         <h2 className='heading-2'>{message}</h2>
         <section className={(data.message) ? 'data' : 'data no-message'}>
            <Statistics data={data.statistics}/>
            <UserAgenda data={data.agenda}/>
            <Message/>
        </section>
    </>
  )
}

function Statistics({data}) {
    return (
        <div className="statistics">
            {
                data.map((item, index) => {
                    return <li className="statistics__item" key={index}>
                        <h3 className='statistics__item-title heading-3'>{item.title}</h3>
                        <p className='statistics__item-value'>
                            <CountingAnimation value={item.value} />
                       </p>
                    </li>
                })
            }
        </div>
    );
}

Statistics.propTypes = {
    data: PropTypes.array.isRequired
};

function UserAgenda({data}) {
    if(data === undefined) return  <section className="agenda">
        <h2 className='heading-2'>Agenda</h2> 
    </section>;

    return (
        <section className="agenda">
            <h2 className='heading-2'>Agenda</h2> 
            <Suspense fallback={<LoadingDiv loading/>}>
            {
                (data.type === 'Bedrijf') ? <BedrijfAgenda data={data} /> : <Agenda data={data}/>
            }
            </Suspense>
        </section>
    );
}

UserAgenda.propTypes = {
    data: PropTypes.object.isRequired
};

function Message({}) {
    return (
        <div className="message">Full Height and 1/3 Width</div>
    );
}

Message.propTypes = {
    
};
