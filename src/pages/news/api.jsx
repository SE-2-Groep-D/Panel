import {fetchApi, fetchData} from "@api";

async function fetchApiArticles() {
    try {
        const data = await fetchData('/nieuwsbrief');
        return {
            success: true,
            articles: data
        }
    } catch (err) {
        return {
            success: false,
            articles: err
        }
    }
}

async function updateApiArticle(article) {
    try {
        await fetchApi(`/nieuwsbrief/update/${article.id}`, "PUT", article);
        return {
            success: true,
            message: ''
        }
    } catch (Error) {
        return {
            success: false,
            message: 'Kon het artikel helaas niet updaten door een fout.'
        }
    }
}

async function createApiArticle(article) {
    try {
        const id = await fetchApi(`/nieuwsbrief`, "POST", article);
        return {
            success: true,
            message: '',
            id: id
        }
    } catch (Error) {
        return {
            success: false,
            message: 'Kon het artikel helaas niet updaten door een fout.'
        }
    }
}

async function deleteApiArticle(article) {
    try {
        await fetchApi(`/nieuwsbrief/delete/${article.id}`, "DELETE", null);
        return {
            success: true,
            message: ''
        }
    } catch (Error) {
        return {
            success: false,
            message: 'Kon het artikel helaas niet verwijderen door een fout.'
        }
    }
}

export {fetchApiArticles, updateApiArticle, createApiArticle, deleteApiArticle}