import '@pagestyles/research/results/_tracking-results.scss';

import {LoadingDiv, CountingAnimation} from '@components'
import { fetchData } from "@api";

export default function TrackingResults({researhId}) {
    const [data, setData] = useState();

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
     <div className='tracking'>
           
            <Statistics data={data} />
            <div className='tracking__results'> 
                <PageResults data={data.trackingResultaten} />
                <OtherResults data={data.otherResults}/>
            </div>
     </div>
    );
}

function Statistics({data}) {
    const [ref, inView] = useIntersectionObserver();
    return (
        <section ref={ref} className={(inView)? 'statistics moveIn bottom': 'statistics'}>
        <h1 className='heading-2'>Trackingscript resultaten</h1>
  
        <ul className='statistics__items'>
            <li className='statistics__item'>
                <h3 className='statistics__item-title heading-3'>Aantal participanten</h3>
                <p className='statistics__item-value'>
                    <CountingAnimation value={data.participants} />
                </p>
            </li>
  
            <li className='statistics__item'>
                <h3 className='statistics__item-title heading-3'>Gemiddelde scroll percentage</h3>
                <p className='statistics__item-value'>
                    <CountingAnimation value={data.scrollPercentage + '%'} />
                </p>
            </li>
  
            <li className='statistics__item'>
                <h3 className='statistics__item-title heading-3'>Gemiddelde tijd per pagina</h3>
                <p className='statistics__item-value'>
                    <CountingAnimation value={data.timePerPage + 'm'} />
                </p>
            </li>
        </ul>
    </section>
    );
  }

function PageResults({data}) {
    const [ref, inView] = useIntersectionObserver();
    var className = (inView) ? 'tracking__results__page moveIn bottom' : 'tracking__results__page';

    if(data === null || data === undefined || data.length === 0) {
        return  <section ref={ref} className={className}>
                <h2 className='heading-2'>Pagina resultaten</h2>
                <p className='text'>Nog geen resultaten gevonden.</p>
        </section>
    }

    return (
        <section ref={ref} className={className}>
            <h2 className='heading-2'>Pagina resultaten</h2> 

            <table className='page-results'>
                <thead>
                    <tr>
                        <th className='heading-3'>Pagina</th>
                        <th className='heading-3'>Scroll percentage</th>
                        <th className='heading-3'>Tijd tot actie</th>
                    </tr>
                </thead>

                <tbody>

                {data.map((results, i) =>{
                     return (
                      <tr key={i}>
                            <td data-label="Pagina" className='text'>{results.page}</td>
                            <td data-label="Scroll percentage" className='text'>{results.scrollPercentage}</td>
                            <td data-label="Tijd tot actie" className='text'>{results.timeToAction}</td>
                      </tr>
                     )
               })}

                </tbody>
             </table>
        </section>    
    );
}

function OtherResults({data}) {
    const [ref, inView] = useIntersectionObserver();
    var className = (inView)? 'tracking__results__other moveIn bottom' : 'tracking__results__other';
    if(data === null || data === undefined || data.length === 0) {
        return      <section ref={ref} className={className}>
               <h2 className='heading-2'>Andere resultaten</h2> 
                <p className='text'>Nog geen resultaten gevonden.</p>
        </section>
    }

    return (
        <section ref={ref} className={className}>
              <h2 className='heading-2'>Andere resultaten</h2> 
              <ul className='result-list'>
            {
                        data.map((results, i) => {
                            const itemValue = (results.value === null || results.value === undefined || results === "") ? "Geen resultaat" : results.value;

                            return (
                                <li className='result-list__item' key={i}>
                                    <h3 className='result-list__item__title'>{results.title}</h3>
                                    <p className='result-list__item__value'>{itemValue}</p>
                                </li>
                            );
                    })
                    }
              </ul>
        </section>
    );
}


async function fetchResearchData(id, setData) {
    if(id === undefined || id === null) return;

    try {
        const data = await fetchData(`/tracking/${id}`);
        setData(data)
    } catch (err) {
        setData(err);
    }
}

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {useIntersectionObserver} from "../../../../hooks/index.js";


Statistics.propTypes = {
    data: PropTypes.object.isRequired,
  };

PageResults.propTypes = {
  data: PropTypes.array.isRequired,
};

OtherResults.propTypes = {
  data: PropTypes.array.isRequired,
};