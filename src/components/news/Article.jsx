import PropTypes from "prop-types";
import {formatDate, formatString} from "@utils";

import {Button, LoadingDiv, ToolTip} from "@components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Status} from "@pages/news/data/newsContext.jsx";
import {useIntersectionObserver} from "@hooks";

export default function Article({article, manage, loading, setStatus, deleteArticle}) {
    const [ref, inView] = useIntersectionObserver();
    const message = formatString(article.inhoud, 195);

    return <article ref={ref} className={(inView) ? 'news-article moveIn bottom' : 'news-article'}>
        <LoadingDiv loading={loading}>
            <div className="news-article__header">
                <p className='news-article__date'>
                    <FontAwesomeIcon icon={faCalendar}/>
                    {formatDate(article.datum)}
                </p>

                <ManageButtons shown={manage} article={article} deleteArticle={deleteArticle} setStatus={setStatus}/>
            </div>
            <div className="news-article__content">
                <h2 className='heading-2'>{article.titel}</h2>
                <p className='text'>{message}</p>
            </div>
            <div className="news-article__footer">
                <Button label={`Klik op deze knop om het hele artikel: ${article.titel} te bekijken.`} onClick={() => setStatus(Status.READ, article)}>
                    Bekijk artikel
                </Button>
            </div>
        </LoadingDiv>
    </article>
}

function ManageButtons({article, shown, setStatus, deleteArticle}) {
    if(!shown || !article) return null;

    return (
        <div className="buttons">
            <ToolTip message='Bewerk'>
                <button className='delete' aria-label='Klik op deze knop om het artikel te verwijderen.' onClick={() => setStatus(Status.UPDATE, article)}>
                    <FontAwesomeIcon icon={faPencil}/>
                </button>
            </ToolTip>

            <ToolTip message='Verwijder'>
                <button className='delete' aria-label='Klik op deze knop om het artikel te verwijderen.' onClick={ () => deleteArticle(article)} >
                    <FontAwesomeIcon icon={faTrashCan}/>
                </button>
            </ToolTip>
        </div>
    );
}

ManageButtons.propTypes = {
    article: PropTypes.object,
    shown: PropTypes.bool,
    setStatus: PropTypes.func,
    deleteArticle: PropTypes.func
};

Article.propTypes = {
    article: PropTypes.object.isRequired,
    manage: PropTypes.bool,
    loading: PropTypes.bool,
    setStatus: PropTypes.func,
    deleteArticle: PropTypes.func
};

