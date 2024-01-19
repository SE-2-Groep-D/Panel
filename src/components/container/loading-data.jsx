import { LoadingDiv, ServerError } from "@components";

function LoadingData({ data, children }) {

    console.log(data);

    if (data === undefined) {
        return <LoadingDiv loading />;
    }

    if (data === null || data.length === 0) {
        return <h2 className='heading-2 not-found'>Geen resultaten gevonden</h2>;
    }

    if (data instanceof Error) {
        return <ServerError message='Er is een fout opgetreden tijdens het ophalen van de resultaten.' />;
    }

    return null;
}

export default LoadingData;