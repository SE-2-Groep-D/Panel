import '@pagestyles/research/question-list-results.scss';

import { useState, useEffect } from 'react';
import {fetchData} from '@services';

import CountingAnimation from '../counting-animation';
import { LoadingDiv, Modal} from '@components';

import QuestionData from './QuestionData.jsx';
import Questions from './Questions.jsx';



export default function QuestionListResults({researhId}) {
  const [data, setData] = useState();
  const [question, setQuestion] = useState();

  useEffect(() => {
      fetchResearchData(researhId, setData);
  },[researhId]);


  if(data === null) {
      return <h1 className='heading-2 not-found'>Geen resultaten gevonden</h1>
  }

  if(data instanceof Error) {
      return <h1 className='heading-2 not-found'>Er is een fout opgetreden tijdens het ophalen van de resultaten.</h1>
  }

  if(data === undefined) {
      return <LoadingDiv loading />;
  }

  return (
      <section className='question-list'>
          <Modal open={question !== undefined && question !== null && question !== ''} onClose={() => setQuestion(undefined)}>
            <QuestionData data={data.vragen} id={question} setQuestion={setQuestion}/>
          </Modal>
          <Statistics data={data}/>
          <Questions data={data.vragen} setQuestion={setQuestion}/>
      </section>
  )
}

function Statistics({data}) {
  return (
      <section className='statistics moveIn bottom'>
      <h1 className='heading-2'>Vragenlijst resultaten</h1>

      <ul className='statistics__items'>
          <li className='statistics__item'>
              <h3 className='statistics__item-title heading-3'>Aantal participanten</h3>
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



QuestionListResults.protoTypes = {
  researhId: PropTypes.string.isRequired
}


Statistics.propTypes = {
  data: PropTypes.object.isRequired,
};