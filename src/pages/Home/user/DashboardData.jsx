import "@pagestyles/home/default.scss";

import {Suspense, lazy, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {fetchData} from "@api";

import {LoadingDiv, CountingAnimation, Modal} from '@components';

const Agenda = lazy(() => import('./component/Agenda.jsx'));
const CompanyAgenda = lazy(() => import('./component/CompanyAgenda.jsx'));

export default function DashboardData({message}) {
    const [data, setData] = useState();

    useEffect(() => {
        fetchUserData(setData);
    }, []);
    
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
         <section className={(data.news && data.news.length > 0 && data.type !== 'Bedrijf') ? 'data' : 'data no-message'}>
            <Statistics data={data.statistics}/>
            <UserAgenda data={data.agenda} type={data.type}/>
            <Message articles={data.news}/>
        </section>
    </>
  )
}

async function fetchUserData(setData) {
    const id = '08dc09ee-a444-4aee-8b6f-6d769fedd493';

    try {
        const data = await fetchData(`/dashboard/${id}`);
        console.log(data);
        setData(data);
    } catch (err) {
        setData(err);
    }
}

function Statistics({data}) {
    if(!data) return null;
    return (
        <div className="statistics moveIn bottom">
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

function UserAgenda({data, type}) {
    if(data === undefined) return  <section className="agenda">
        <h2 className='heading-2'>Agenda</h2>
        <p className='text'>Geen planning gevonden.</p>
    </section>;


    return (
        <section className="agenda moveIn bottom">
            <h2 className='heading-2'>Agenda</h2> 
            <Suspense fallback={<LoadingDiv loading/>}>
            {
                (type === 'Bedrijf') ? <CompanyAgenda data={data} /> : <Agenda data={data}/>
            }
            </Suspense>
        </section>
    );
}

UserAgenda.propTypes = {
    data: PropTypes.array.isRequired
};

function Message({articles}) {
    const [article, setArticle] = useState();
    const isArticle = article !== undefined && article !== null && article !== '';

    if(!articles) return null;
    articles.sort((a, b) =>   new Date(b.date) - new Date(a.date))



    return (
        <div className="news moveIn bottom">
            <h2 className="heading-2">Laatste Nieuws</h2>
            <Modal open={isArticle} onClose={() => setArticle(undefined)}>
                <h2 className="heading-2">{(article) ? article.title : ''}</h2>
                <p className='text'>{(article) ? article.text : ''}</p>
            </Modal>

            {
                articles.map((currentArticle, index) => {
                    const message = getShortenedMessage(currentArticle.text);
                    const link = (message.endsWith("...")) ? <button onClick={() => setArticle(currentArticle)}>Lees meer over {currentArticle.title}</button> : null;

                    return (<article key={index}>
                        <h3 className="heading-3">{currentArticle.title}</h3>
                        <p className='text'>{message}</p>
                        {link}
                    </article>);
                })
            }
        </div>
    );
}

function getShortenedMessage(message) {
    if(!message) return '';
    return message.substring(0, 250) + "...";
}

Message.propTypes = {
    articles: PropTypes.array.isRequired
};
