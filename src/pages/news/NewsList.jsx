import '@pagestyles/news/list.scss';

import {useAuth} from "@hooks";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchData} from "@api";

import PropTypes from "prop-types";


import {Button, LoadingDiv, Modal} from "@components";
import ServerError from "@components/error/ServerError.jsx";
import {formatDate} from "@services";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faClock, faTrashCan} from "@fortawesome/free-solid-svg-icons";


export default function NewsList() {
    const nav = useNavigate();
    const [articles, setArticles] = useState();
    const [currentArticle, setCurrentArticle] = useState();

    const {userInfo} = useAuth();
    const {userType} = userInfo;

    useEffect(() => {
        if(userType !== 'Medewerker' && userType !== 'Beheerder') return;
        fetchNews(setArticles)
    }, [userType]);

    if(userType !== 'Medewerker' && userType !== 'Beheerder') {
        nav('/');
        return;
    }

    if(articles === undefined) {
        return <LoadingDiv loading/>
    }

    if(articles instanceof Error) {
        return <ServerError message='Er is een fout opgetreden bij het ophalen van van de nieuwsberichten. Probeer het later opnieuw.'/>
    }

    return (
        <main className='news gray'>
            <div className='news-navigation'>
                <h1 className='heading-1'>Nieuwsbrieven</h1>

                <div className="filters"></div>
            </div>

            {
                (currentArticle) ?
                    <Modal open={(currentArticle)}>
                        <h1 className='heading-1'>{(currentArticle.titel) ? currentArticle.titel : ''}</h1>
                        <p className='text'>{(currentArticle.inhoud) ? currentArticle.inhoud : ''}</p>
                    </Modal>
                    : null
            }
            <ul className="news-articles">
                {
                    articles && articles.map((article, key) => {
                        return <NewsArticle article={article} key={key} setCurrentArticle={setCurrentArticle}/>
                    })
                }
            </ul>
        </main>
    );
}


function NewsArticle({article, key, setCurrentArticle}) {
    const message = getShortenedMessage(article.inhoud);

    return <article className='news-article' key={key}>
            <div className='news-article__header'>
                <h2 className='heading-2'>{article.titel}</h2>

                <div className="tags">
                    <span className='tag'>
                        <FontAwesomeIcon icon={faCalendar}/>
                        {formatDate(article.datum)}
                    </span>
                </div>
            </div>
            <div className='news-article__content'>
                <p className='text'>{message}</p>
                <div className="buttons">
                    <Button onClick={() => setCurrentArticle(article)}>
                        Bekijk artikel, {article.titel}
                    </Button>

                    <Button varient='text'  color='tertiary' className='delete' onClick={() => setCurrentArticle(article)} >
                        <FontAwesomeIcon icon={faTrashCan}/>
                        Verwijder artikel
                    </Button>

                </div>

            </div>
        </article>
}

function getShortenedMessage(message) {
    if (!message) return "";
    return message.substring(0, 250) + "...";
}

NewsArticle.propTypes = {
    article: PropTypes.object.isRequired,
    key: PropTypes.number.isRequired,
    setCurrentArticle: PropTypes.func.isRequired,
};


async function fetchNews(setArticles) {
    try {
        const data = await fetchData('/nieuwsbrief');
        setArticles(data);
    } catch (err) {
        setArticles(err);
    }
}