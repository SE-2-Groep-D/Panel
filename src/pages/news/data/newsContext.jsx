import { createContext, useReducer } from "react";
import { createApiArticle, updateApiArticle, deleteApiArticle, fetchApiArticles } from "../api.jsx";
import {sortObjectByDate} from "@utils"; // Corrected import path

export const NewsContext = createContext();

const defaultState = {
    article: undefined,
    articles: [], // Changed to an empty array
    status: undefined,
    message: '',
    loading: false
}

const Status = {
    UPDATE: 'update',
    CREATE: 'create',
    READ: 'read'
}

export {Status}

export const NewsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);


    async function fetchArticles() {
        dispatch({type: 'loading'});

        const response = await fetchApiArticles();
        if(response instanceof Error) {
            dispatch({type: 'error', message: 'Er is iets fout gegaan tijdens het ophalen van de artikelen. Probeer het later opnieuw.'});
        }

        dispatch({type: 'fetch', articles: response.articles})
    }

    function setStatus(status, article) {
        dispatch({type: 'status', status: status, article: article});
    }

    async function updateArticle(newArticle) {
        dispatch({type: 'loading'});
        const response = await updateApiArticle(newArticle);
        if(!response.success) {
            dispatch({type: 'error', message: response.message});
            return;
        }

        dispatch({ type: 'update', article: newArticle});
    }

    async function deleteArticle(newArticle) {
        dispatch({type: 'loading'});
        const response = await deleteApiArticle(newArticle);
        if(!response.success) {
            dispatch({type: 'error', message: response.message});
            return;
        }
        dispatch({ type: 'delete', article: newArticle });
    }

    async function createArticle(newArticle) {
        dispatch({type: 'loading'});
        const response = await createApiArticle(newArticle);
        if(!response.success) {
            dispatch({type: 'error', message: response.message});
            return;
        }

        const addedArticle = {
            id: response.id,
            ...newArticle
        }

        dispatch({ type: 'create', article: addedArticle });
    }

    return (
        <NewsContext.Provider value={{ ...state, fetchArticles, setStatus, createArticle, updateArticle, deleteArticle }}>
            {children}
        </NewsContext.Provider>
    );
}


const reset = {
    message: '',
    loading: false,
    article: undefined,
    status: undefined
}

function reducer(state, action) {
    var newArticles = [];

    switch (action.type) {
        case 'loading':
            return {...state, loading: true}

        case 'fetch':
            return {...state, articles: action.articles, message: '', loading: false}
        case 'create':
            newArticles = [...state.articles, action.article];
            return {...state, ...reset,
                articles: sortObjectByDate(newArticles),
            };
        case 'update':
            newArticles = [action.article, ...state.articles.filter(item => item.id !== action.article.id)];
            return {...state, ...reset,
                articles: sortObjectByDate(newArticles)
            }
        case 'delete':
            newArticles = state.articles.filter(item => item.id !== action.article.id);
            return {...state, ...reset,
                articles: sortObjectByDate(newArticles)
            };
        case 'status':
            return {...state, status: action.status, article: action.article};
        case 'error':
            return {...state, ...reset,
                message: action.message
            };
        default:
            return state;
    }
}
