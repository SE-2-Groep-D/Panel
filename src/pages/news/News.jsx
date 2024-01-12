import '@pagestyles/news/_news-list.scss';
import {NewsProvider} from "@pages/news/data/newsContext.jsx";
import NewsList from './components/NewsList.jsx';

function News() {
    return (
        <NewsProvider>
            <NewsList/>
        </NewsProvider>
    );
}

export default News;
