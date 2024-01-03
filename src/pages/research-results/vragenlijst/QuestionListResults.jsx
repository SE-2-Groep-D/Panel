import '@pagestyles/research/question-list-results.scss';

import CountingAnimation from '../counting-animation';
import { useState, useEffect } from 'react';
import { LoadingDiv, Modal, Button } from '@components';
import {fetchData} from '@services';


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

function Questions({ data, setQuestion }) {
  if(data === null || data === undefined || data.length == 0) {
    return <div className='questions'>
       <h2 className='heading-2'>Vragenlijst</h2>
       <p className='text'>Nog geen vragen gevonden.</p>
    </div>
  }

  function selectedQuestion(event) {
    if(event.type !== 'click' && event.type !== 'keydown') return;
    if(event.type === 'keydown') {
      if(event.key !== 'Enter' && event.keyCode !== 32 && event.keyCode !== 13) return;
    }

      const { id } = event.currentTarget;
      setQuestion(id);
  }

  return (
    <section className='questions moveIn bottom'>
    <table >
      <thead>
          <tr>
            <th className='heading-3'>Vraag</th>
            <th className='heading-3'>Aantal antwoorden</th>
          </tr>
        </thead>
        <tbody>
          {data.map((question, i) => {
            i++;
           return (
              <tr
              tabIndex={0} 
              id={question.id} 
              key={i} 
              aria-label={`Klik met de muis of druk op enter om meer informatie te zien over vraag ${i}.`}
              onClick={selectedQuestion}
              onKeyDown={selectedQuestion}
              >
                  <td data-label="Vraag" className='text bold'>
                    <span className='number bold'>{i}</span> 
                    {question.onderwerp}
                  </td>
                  <td data-label="Aantal antwoorden" className='text bold'> {question.antwoorden.length} </td>
              </tr>
          
            )
          })}
        </tbody>
      </table>
    </section>
  );
}

function QuestionData({data, id, setQuestion}) {
  if(id === undefined || id === null || id === '') return;
  const questionNumber = data.findIndex((item) => item.id === id);
  const question = data[questionNumber];
  
  const nextQuestion = () => setQuestion(data[questionNumber + 1]?.id);
  const prevQuestion = () => setQuestion(data[questionNumber - 1]?.id);

  const nextButton = <Button onClick={nextQuestion} color="secondary" varient="text">Volgende vraag</Button>;
  const prevButton = <Button onClick={prevQuestion} color="secondary" varient="text">Vorige vraag</Button>;

  const antwoorden = (question.antwoorden.length == 0)?  
  <li className='awnser'> Geen antwoorden</li> : 
  question.antwoorden.map((item, index) => {
    return <li className="awnser" id={item.id} key={index}>
      <span>{index + 1}.</span>
      {item.tekst}
    </li>
  });

  return <section className='question-info'>
      <h2 className='heading-2'>Vraag {questionNumber + 1}</h2>
      <h3 className='question heading-3'>{question.onderwerp}</h3>
      
      <div className='awnser-box'>
        <h3 className='heading-3'>Antwoorden</h3>
        <ul className='awnsers'>
        {antwoorden}
        </ul>
      </div>
      
      <div className='button-box'>
        {questionNumber !== 0 && prevButton}
        {questionNumber !== data.length - 1 && nextButton}
      </div>
  </section>
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

Questions.propTypes = {
  data: PropTypes.array.isRequired,
  setQuestion: PropTypes.func.isRequired
};

QuestionData.propTypes = {
  data: PropTypes.array.isRequired,
  id: PropTypes.string
};

Statistics.propTypes = {
  data: PropTypes.object.isRequired,
};