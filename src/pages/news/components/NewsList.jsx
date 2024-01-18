import {useNewsInfo} from "@pages/news/data/useNewsInfo.jsx";
import {useEffect} from "react";
import {Button, LoadingDiv, ServerError} from "@components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import AricleModal from "@components/news/ArticleModal.jsx";
import AricleList from "@pages/news/components/ArticleList.jsx";
import {Status} from "@pages/news/data/newsContext.jsx";
import {useAuth} from "@hooks";
import {hasPermission, Role} from "@api";
import LoadingData from "@components/container/loading-data.jsx";

export default function NewsList() {
    const {fetchArticles} = useNewsInfo();

    useEffect(() => {
        fetchArticles();
    }, []);

    return <NewsComponent/>;
}

function NewsComponent() {
    const {articles, message, setStatus} = useNewsInfo();
    const {userInfo} = useAuth();

    if(!articles) {
        return <LoadingData data={articles}/>
    }


   return (
       <main className='gray'>
           <section className="news">
               <div className='news-navigation'>
                   <div className="title-box">
                       <h1 className='heading-1'>Nieuwsbrieven</h1>
                       <p className='error'>{message}</p>
                   </div>

                   <div className="filters">
                       {
                           (hasPermission(Role.Medewerker)) ?
                               <Button label='Klik op deze knop om een nieuw artikel toe te voegen.' color='secondary' onClick={() => setStatus(Status.CREATE, null)}>
                                   <FontAwesomeIcon icon={faAdd}/>
                                   Nieuw Artikel
                               </Button>
                               : null
                       }
                   </div>
               </div>

               <AricleModal />
               <AricleList/>
           </section>
       </main>
   );
}

