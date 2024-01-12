import {useNewsInfo} from "@pages/news/data/useNewsInfo.jsx";
import Article from "@components/news/Article.jsx";
import {ArticleModal} from "@components";
import {Status} from "@pages/news/data/newsContext.jsx";
import {useAuth} from "@hooks";
import {sortObjectByDate} from "@utils";

export default function AricleList() {
    const {article, status, articles, setStatus, deleteArticle, updateArticle, createArticle, loading} = useNewsInfo();
    const sortedArticles = sortObjectByDate(articles);
    const {userInfo} = useAuth();

    function closeModal(e) {
        if(status === Status.READ) {
            setStatus(undefined, undefined);
            return;
        }

        const values = e.values;
        const articleData = {
            titel: values[0].innerText,
            inhoud: values[1].innerText,
        }

        if(status === Status.UPDATE) {
            updateArticle({...article, ...articleData});
            return;
        }
        const newArticle = {
            ...articleData,
            datum: new Date(),
            medewerkerId: userInfo.id,
        }

        createArticle(newArticle);
    }

    return (
        <>
            <ArticleModal article={article} status={status} onClose={closeModal}/>
            <ul className="news-articles">
                {
                    sortedArticles.map((a, key) => {
                        return <Article loading={loading && article && article.id === a.id} manage={userInfo.userType === 'Medewerker' || userInfo.userType === 'Beheerder'} article={a} key={key} setStatus={setStatus} deleteArticle={deleteArticle}/>
                    })
                }
            </ul>
        </>
    )
}