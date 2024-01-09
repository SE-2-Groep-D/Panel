import "@pagestyles/home/default.scss";

import {Suspense, lazy, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {fetchData} from "@api";

import {LoadingDiv, CountingAnimation, Modal} from '@components';
import {useAuth} from "@hooks";

const Agenda = lazy(() => import('./component/Agenda.jsx'));
const CompanyAgenda = lazy(() => import('./component/CompanyAgenda.jsx'));

export default function DashboardData({message}) {
    const [data, setData] = useState();
    const userData = useAuth();

    useEffect(() => {
        fetchUserData(userData, setData);
    }, [userData]);
    
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
         <section className={(data.news && data.news.length > 0 && data.type !== 'test') ? 'data' : 'data no-message'}>
            <Statistics data={data.statistics}/>
            <UserAgenda data={data.agenda} type={data.type}/>
            <Message articles={data.news}/>
        </section>
    </>
  )
}

async function fetchUserData(data, setData) {
    const {id} = data.userInfo;

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
                (type === 'dfafda') ? <CompanyAgenda data={data} /> : <Agenda data={data}/>
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
    articles.sort((a, b) =>   new Date(b.datum) - new Date(a.datum))


    return (
        <section className="news moveIn bottom">
            <h2 className="heading-2">Laatste Nieuws</h2>
            <Modal open={isArticle} onClose={() => setArticle(undefined)}>
                <h2 className="heading-2">{(article) ? article.titel : ''}</h2>
                <p className='text'>{(article) ? article.inhoud : ''}</p>
            </Modal>

            {
                articles.map((currentArticle, index) => {
                    const message = getShortenedMessage(currentArticle.inhoud);
                    const link = (message.endsWith("...")) ? <button onClick={() => setArticle(currentArticle)}>Lees meer over {currentArticle.titel}</button> : null;

                    return (<article key={index}>
                        <h3 className="heading-3">{currentArticle.titel}</h3>
                        <p className='text'>{message}</p>
                        {link}
                    </article>);
                })
            }
        </section>
    );
}

function getShortenedMessage(message) {
    if(!message) return '';
    return message.substring(0, 250) + "...";
}

Message.propTypes = {
    articles: PropTypes.array.isRequired
};
