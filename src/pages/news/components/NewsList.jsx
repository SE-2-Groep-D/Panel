import {useNewsInfo} from "@pages/news/data/useNewsInfo.jsx";
import {useEffect} from "react";
import {Button, LoadingDiv, ServerError} from "@components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import AricleModal from "@components/news/ArticleModal.jsx";
import AricleList from "@pages/news/components/ArticleList.jsx";
import {Status} from "@pages/news/data/newsContext.jsx";
import {useAuth} from "@hooks";

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

    if(articles === undefined) {
        return <LoadingDiv loading/>
    }

    if(articles instanceof Error) {
        return <ServerError message='Er is een fout opgetreden bij het ophalen van van de nieuwsberichten. Probeer het later opnieuw.'/>
    }


   return (
       <main className='news gray'>
           <div className='news-navigation'>
               <div className="title-box">
                   <h1 className='heading-1'>Nieuwsbrieven</h1>
                   <p className='error'>{message}</p>
               </div>

               <div className="filters">
                   {
                       (userInfo.userType === 'Medewerker' || userInfo.userType === 'Beheerder') ?
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
       </main>
   );
}

