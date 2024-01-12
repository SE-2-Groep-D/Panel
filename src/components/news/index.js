import {lazy} from "react";

const Article = lazy(() => import('./Article.jsx'));
const ArticleModal = lazy(() => import('./ArticleModal.jsx'));

export {Article, ArticleModal}