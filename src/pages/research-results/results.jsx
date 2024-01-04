import '@pagestyles/research/research-results.scss';

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {lazy, Suspense} from 'react';
import {fetchData} from '@services';


import {Icon, OptionSelector, LoadingDiv} from '@components';

const TrackingResults = lazy(() => import('./tracking/TrackingResults.jsx'));
const QuestionListResults = lazy(() => import('./vragenlijst/QuestionListResults.jsx')); 

export default function Results() {
    const [options, setOptions] = useState(undefined);
    const [selectedOption, setSelectedOption] = useState();
    const { id } = useParams();

    useEffect(() => {
        fetchOptions(id, setOptions);
    }, [id]);


    const ResultsComponent = renderedResults(options, selectedOption);
    const inputOptions = getOptionsList(options);

  return (
    <main className='results'>
            <div className='navigation'>
                <a href={`/onderzoek/` + id} className='back'>
                    <Icon type="back" size="17"/>
                    Terug
                </a>

                <OptionSelector onChange={(e) => setSelectedOption(e.value)} options={inputOptions} value={selectedOption}>Resultaten</OptionSelector>
            </div>

            <LoadingDiv loading={options === undefined}>
                    {ResultsComponent}
            </LoadingDiv>
        </main>
    );
}
async function fetchOptions(researchId, setOptions) {
    try {
        const data = await fetchData(`/resultaten/${researchId}`);
        const {trackingOnderzoeken, vragenlijsten} = data;
        const options = [];

        addTracking(options, trackingOnderzoeken)
        addVragenlijsten(options, vragenlijsten)
        setOptions(options);

    } catch(err) {
        console.log('error while fetching: ' + err)
        setOptions(null);
    }

    function addTracking(options, tracking) {
        if(tracking) tracking.forEach((data) => {
            const {id, domain} = data;
            const finalDomain = getDomainFromUrl(domain);

            options.push({
                id: id,
                title: finalDomain,
                type: 'script'
            })
        });
    }

    function addVragenlijsten(options, vragenlijst) {
        if(vragenlijst) vragenlijst.forEach((lijst) => {
            options.push({
                id: lijst.id,
                title: lijst.titel,
                type: 'list'
            })
        });
    }
}

function renderedResults(options, selectedOption) {
    const data = getRenderedOption(options, selectedOption);

    if(options === undefined || data === undefined) {
        return <></>
    }

    if(options === null) {
        return <h1 className='heading-2 not-found'>Er is een fout opgetreden tijdens het ophalen van de resultaten.</h1>
    }

    if(options.length == 0) {
        return <h1 className='heading-2 not-found'>Geen resultaten gevonden.</h1>
    }

    const {id, type} = data;

    const component = (type === 'script') ?
                        <TrackingResults researhId={id} /> :
                        <QuestionListResults researhId={id} />

    return (
        <Suspense fallback={<LoadingDiv loading/>}>
            {component}
        </Suspense>
    )
}

function getRenderedOption(options, selectedOption) {
    if(options === null || options == undefined) {
        return options;
    }
    return options.find(option => option.title === selectedOption);
}

function getOptionsList(options) {
    if(options === null || options === undefined) {
        return []
    }

   return options.map(option => option.title);
}

function getDomainFromUrl(url) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch (error) {
      console.error('Invalid URL:', error.message);
      return null;
    }
}
