import "@pagestyles/home/default.scss";

import {Suspense, lazy, useState, useEffect} from 'react'
import PropTypes from 'prop-types';

import {LoadingDiv, CountingAnimation, Modal} from '@components';

const Agenda = lazy(() => import('./component/Agenda.jsx'));
const CompanyAgenda = lazy(() => import('./component/CompanyAgenda.jsx'));

export default function DashboardData({message}) {
    const [data, setData] = useState(
        {
            type: 'Bedrijf',
            newsMessages: [{
                title: 'Titel',
                text: 'Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.\n' +
                    'Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum. Et scelerisque elementum enim porttitor eu neque. Eget sit in tempus aliquam aliquam ut iaculis ut.. Id in viverra tellus \n Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.\n' +
                    'Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum. Et scelerisque elementum enim porttitor eu neque. Eget sit in tempus aliquam aliquam ut iaculis ut.. Id in viverra tellus \n Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.\n' +
                    'Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum. Et scelerisque elementum enim porttitor eu neque. Eget sit in tempus aliquam aliquam ut iaculis ut.. Id in viverra tellus \n Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.\n' +
                    'Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum. Et scelerisque elementum enim porttitor eu neque. Eget sit in tempus aliquam aliquam ut iaculis ut.. Id in viverra tellus \n Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.\n' +
                    'Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum. Et scelerisque elementum enim porttitor eu neque. Eget sit in tempus aliquam aliquam ut iaculis ut.. Id in viverra tellus \n Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.\n' +
                    'Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum. Et scelerisque elementum enim porttitor eu neque. Eget sit in tempus aliquam aliquam ut iaculis ut.. Id in viverra tellus \n Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.\n' +
                    'Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum. Et scelerisque elementum enim porttitor eu neque. Eget sit in tempus aliquam aliquam ut iaculis ut.. Id in viverra tellus \n Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.\n' +
                    'Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum. Et scelerisque elementum enim porttitor eu neque. Eget sit in tempus aliquam aliquam ut iaculis ut.. Id in viverra tellus \n Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.\n' +
                    'Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum. Et scelerisque elementum enim porttitor eu neque. Eget sit in tempus aliquam aliquam ut iaculis ut.. Id in viverra tellus \n ',
                date: '1-1-2024'
            },
                {
                    title: 'Titel 2',
                    text: 'Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.\n' +
                        'Ullamcorper in fermentum velit aliquet sollicitudin. Id in viverra tellus diam elementum. Et scelerisque elementum enim porttitor eu neque. Eget sit in tempus aliquam aliquam ut iaculis ut.. Id in viverra tellus \n',
                    date: '8-1-2024'
                },
                {
                    title: 'Titel 3',
                    text: 'Lorem ipsum dolor sit amet consectetur. Enim consectetur amet ipsum ultrices imperdiet laoreet risus risus. Etiam ultricies ridiculus id metus pretium mi. Est consectetur auctor faucibus dolor vitae in libero. Eu diam nulla et facilisi fermentum id aenean.',
                    date: '02-12-2023'
                }],
            statistics: [{title: 'Ingeschreven opdrachten', value: 3}, {title: 'Voltooide opdrachten', value: 10}],
            agenda: [
                {
                    company: 'Google',
                    title: 'Locatie bezoek',
                    date: '10-01-2024',
                    status: 'Active',
                    participants: 50
                },
                {
                    company: 'Facebook',
                    title: 'Website bezoek',
                    date: '11-01-2024',
                    status: 'Open',
                    participants: 30
                }, 
                {
                    company: 'Microsoft',
                    title: 'Curus',
                    date: '12-01-2024',
                    status: 'Closed',
                    participants: 10
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
         <section className={(data.newsMessages && data.newsMessages.length > 0 && data.type !== 'Bedrijf') ? 'data' : 'data no-message'}>
            <Statistics data={data.statistics}/>
            <UserAgenda data={data.agenda} type={data.type}/>
            <Message articles={data.newsMessages}/>
        </section>
    </>
  )
}

function Statistics({data}) {
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
