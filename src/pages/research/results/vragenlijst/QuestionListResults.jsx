import '@pagestyles/research/results/_question-list-results.scss';

import { useState, useEffect } from 'react';
import { fetchData } from "@api";

import { LoadingDiv, Modal, CountingAnimation} from '@components';

import QuestionData from './QuestionData.jsx';
import Questions from './Questions.jsx';



export default function QuestionListResults({researhId}) {
  const [data, setData] = useState();
  const [question, setQuestion] = useState();

  useEffect(() => {
      fetchResearchData(researhId, setData);
  },[researhId]);


    if(!data || data instanceof Error) {
        return <LoadingData data={data}/>;
    }

  return (
      <section className='question-list'>
          <Modal open={question !== undefined && question !== null && question !== ''} onClose={() => setQuestion(undefined)}>
            <QuestionData data={data.questions} id={question} setQuestion={setQuestion}/>
          </Modal>
          <Statistics data={data}/>
          <Questions data={data.questions} setQuestion={setQuestion}/>
      </section>
  )
}

function Statistics({data}) {
    const [ref, inView] = useIntersectionObserver();

  return (
      <section ref={ref} className={(inView)? 'statistics moveIn bottom' : 'statistics'}>
      <h1 className='heading-2'>Vragenlijst resultaten</h1>

      <ul className='statistics__items'>
          <li className='statistics__item'>
              <h3 className='statistics__item-title heading-3'>Maximaal aantal participanten</h3>
              <p className='statistics__item-value'>
                <CountingAnimation value={data.participants} />
              </p>
          </li>

          <li className='statistics__item'>
              <h3 className='statistics__item-title heading-3'>Aantal vragen</h3>
              <p className='statistics__item-value'>
                <CountingAnimation value={data.totalQuestions} />
              </p>
          </li>

           <li className='statistics__item'>
              <h3 className='statistics__item-title heading-3'>Total Awnsers</h3>
              <p className='statistics__item-value'>
                <CountingAnimation value={data.totalAwnsers} />
              </p>
          </li> 
      </ul>
  </section>
  );
}

async function fetchResearchData(id, setData) {
  if(id === undefined || id === null) return;
  try {
      const data = await fetchData(`/vragenlijst/${id}`);
      setData(data)
  } catch (err) {
      setData(err);
  }
}

import PropTypes from 'prop-types';
import {useIntersectionObserver} from "../../../../hooks/index.js";
import LoadingData from "@components/container/loading-data.jsx";



QuestionListResults.protoTypes = {
  researhId: PropTypes.string.isRequired
}


Statistics.propTypes = {
  data: PropTypes.object.isRequired,
};