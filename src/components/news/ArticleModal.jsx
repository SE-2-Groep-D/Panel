import { useState, useCallback } from 'react';

import {Button, Modal} from "@components";
import {Status} from "@pages/news/data/newsContext.jsx";
import DOMPurify from "dompurify";

function AricleModal({article, status, onClose}) {
    if(status === Status.CREATE) {
        return <CreateModal onClose={onClose}/>
    }

    if(!article) return null;
    if(status === Status.UPDATE) {
        return <UpdateModal article={article} onClose={onClose}/>
    }

    return <ReadModal article={article} onClose={onClose}/>
}

function ReadModal({article, onClose}) {
    return (
        <Modal open={true} onClose={onClose}>
            <h1 className='heading-1'>{article ? article.titel : ""}</h1>
            <p className='text'>{article ? article.inhoud : ""}</p>
        </Modal>
    );
}

function CreateModal({onClose}) {
    const [title, setTitle] = useState('titel')
    const [content, setContent] = useState('tekst...')

    const onTitleBlur = useCallback(evt => {
        setTitle(DOMPurify.sanitize(evt.currentTarget.innerText));
    }, [])

    const onContentBlur = useCallback(evt => {
        setContent(DOMPurify.sanitize(evt.currentTarget.innerText));
    }, [])



    return (
        <Modal open={true} onClose={onClose}>
            <h1 className='heading-1' value={title}
                contentEditable
                onBlur={onTitleBlur}
                dangerouslySetInnerHTML={{__html: title}} />

            <p className='text' value={content}
               contentEditable
               onBlur={onContentBlur}
               dangerouslySetInnerHTML={{__html: content}} />

            <Button className='save' onClick={(e) => {
                const modal = e.target.parentNode.parentNode;
                modal.close();
            }}>
                <FontAwesomeIcon icon={faSave}/>
                Opslaan
            </Button>
        </Modal>
    )
}

function UpdateModal({article, onClose}) {
    const [title, setTitle] = useState(article.titel || '')
    const [content, setContent] = useState(article.inhoud || '')

    const onTitleBlur = useCallback(evt => {
        setTitle(DOMPurify.sanitize(evt.currentTarget.innerText));
    }, [])

    const onContentBlur = useCallback(evt => {
        setContent(DOMPurify.sanitize(evt.currentTarget.innerText));
    }, [])

    return (
        <Modal open={true} onClose={onClose}>
            <h1 className='heading-1' value={title}
                contentEditable
                onBlur={onTitleBlur}
                dangerouslySetInnerHTML={{__html: title}} />

            <p className='text' value={content}
               contentEditable
               onBlur={onContentBlur}
               dangerouslySetInnerHTML={{__html: content}} />

            <Button className='save' onClick={(e) => {
                const modal = e.target.parentNode.parentNode;
                modal.close();
            }}>
                <FontAwesomeIcon icon={faSave}/>
                Opslaan
            </Button>
        </Modal>
    )
}

 import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";


AricleModal.propTypes = {
    article: PropTypes.object,
    onClose: PropTypes.func,
    status: PropTypes.string
};


CreateModal.propTypes = {
    onClose: PropTypes.func
};

ReadModal.propTypes = {
    article: PropTypes.object.isRequired,
    onClose: PropTypes.func
};

UpdateModal.propTypes = {
    article: PropTypes.object.isRequired,
    onClose: PropTypes.func
};

export default AricleModal;
