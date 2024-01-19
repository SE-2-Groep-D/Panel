import "@pagestyles/account/home/_default.scss";

import { Suspense, lazy, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {fetchData, isRole, Role} from "@api";

import { LoadingDiv, CountingAnimation, LoadingData, Article, ArticleModal } from "@components";
import { useAuth } from "@hooks";
import {Status} from "@pages/news/data/newsContext.jsx";
import {sortObjectByDate} from "@utils";
import {useIntersectionObserver} from "@hooks";

const Agenda = lazy(() => import("./component/Agenda.jsx"));
const CompanyAgenda = lazy(() => import("./component/CompanyAgenda.jsx"));

export default function DashboardData({ message }) {
  const [data, setData] = useState();
  const {userInfo} = useAuth();
  const isBedrijf = isRole(Role.Bedrijf);

  useEffect(() => {
    fetchUserData(userInfo, setData);
  }, [userInfo]);

    if(!data || data instanceof Error) {
        return <LoadingData data={data}/>;
    }

  return (
    <>
      <h2 className="heading-2">{message}</h2>
      <section
        className={
          data.news && data.news.length > 0 && !isBedrijf
            ? "data"
            : "data no-message"
        }
      >
        <Statistics data={data.statistics} />
        <UserAgenda data={data.agenda} type={data.type} />
        <Message articles={data.news} />
      </section>
    </>
  );
}

async function fetchUserData(data, setData) {
  const { id } = data;

  try {
    const data = await fetchData(`/dashboard/${id}`);
    setData(data);
  } catch (err) {
    setData(err);
  }
}

function Statistics({ data }) {
    const [ref, inView] = useIntersectionObserver();

  if (!data) return null;
  return (
    <div ref={ref} className={(inView) ? "statistics moveIn bottom" : 'statistics'}>
      {data.map((item, index) => {
        return (
          <li className="statistics__item" key={index}>
            <h3 className="statistics__item-title heading-3">{item.title}</h3>
            <p className="statistics__item-value">
              <CountingAnimation value={item.value} />
            </p>
          </li>
        );
      })}
    </div>
  );
}

Statistics.propTypes = {
  data: PropTypes.array.isRequired,
};

function UserAgenda({ data, type }) {
    const [ref, inView] = useIntersectionObserver();
    const isBedrijf = isRole(Role.Bedrijf)

  if (data === undefined || data.length === 0)
    return (
      <section className="agenda moveIn bottom">
        <h2 className="heading-2">Geplande onderzoeken</h2>
        <p className="text">Er staat nog niks op de planning.</p>
      </section>
    );

  return (
    <section ref={ref} className={(inView) ? "agenda moveIn bottom" : 'agenda'}>
      <h2 className="heading-2">Agenda</h2>
      <Suspense fallback={<LoadingDiv loading />}>
        {isBedrijf ? (
          <CompanyAgenda data={data} />
        ) : (
          <Agenda data={data} />
        )}
      </Suspense>
    </section>
  );
}

UserAgenda.propTypes = {
  data: PropTypes.array.isRequired,
};

function Message({ articles }) {
  const [article, setArticle] = useState();
    const [ref, inView] = useIntersectionObserver();

  if (!articles) return null;
  articles = sortObjectByDate(articles)

  return (
    <section ref={ref} className={(inView)? "news moveIn bottom" : 'news'}>
      <h2 className="heading-2">Laatste Nieuws</h2>
      <Suspense fallback={null}>
          <ArticleModal article={article} status={Status.READ} onClose={() => setArticle(undefined)}/>
      </Suspense>
      {
          articles.map((currentArticle, index) => {
              return <Suspense fallback={null} key={index}>
                  <Article article={currentArticle} manage={false} setStatus={(s, article) => setArticle(article)} key={index}/>
              </Suspense>
          })
      }
    </section>
  );
}

Message.propTypes = {
  articles: PropTypes.array.isRequired,
};
