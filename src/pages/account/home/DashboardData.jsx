import "@pagestyles/account/home/_default.scss";

import { Suspense, lazy, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchData } from "@api";

import { LoadingDiv, CountingAnimation, Modal, Article, ArticleModal } from "@components";
import { useAuth } from "@hooks";
import {Status} from "@pages/news/data/newsContext.jsx";
import {sortObjectByDate} from "@utils";

const Agenda = lazy(() => import("./component/Agenda.jsx"));
const CompanyAgenda = lazy(() => import("./component/CompanyAgenda.jsx"));

export default function DashboardData({ message }) {
  const [data, setData] = useState();
  const userData = useAuth().userInfo;

  useEffect(() => {
    fetchUserData(userData, setData);
  }, [userData]);

  if (data === null) {
    return (
      <h1 className="heading-2 not-found">
        Oeps er is iets fout gegaan tijdens het ophalen van de gebruikers data.
      </h1>
    );
  }

  if (data instanceof Error) {
    return (
      <h1 className="heading-2 not-found">
        Er is een fout opgetreden tijdens het ophalen van de resultaten.
      </h1>
    );
  }

  if (data === undefined) {
    return <LoadingDiv loading />;
  }

  return (
    <>
      <h2 className="heading-2">{message}</h2>
      <section
        className={
          data.news && data.news.length > 0 && data.type !== "test"
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
  if (!data) return null;
  return (
    <div className="statistics moveIn bottom">
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
  if (data === undefined || data.length === 0)
    return (
      <section className="agenda">
        <h2 className="heading-2">Geplande onderzoeken</h2>
        <p className="text">Er staat nog niks op de planning.</p>
      </section>
    );

  return (
    <section className="agenda moveIn bottom">
      <h2 className="heading-2">Agenda</h2>
      <Suspense fallback={<LoadingDiv loading />}>
        {type === "bedrijf" ? (
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

  if (!articles) return null;
  articles = sortObjectByDate(articles)

  return (
    <section className="news moveIn bottom">
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
