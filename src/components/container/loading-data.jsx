import { LoadingDiv, ServerError } from "@components";
import {Suspense} from "react";

function LoadingData({ data, children }) {

    if (data === undefined) {
        return <LoadingDiv loading />;
    }

    if (data === null) {
        return <h2 className='heading-2 not-found'>Geen resultaten gevonden</h2>;
    }

    if (data instanceof Error) {
        return <ServerError message='Er is een fout opgetreden tijdens het ophalen van de resultaten.' />;
    }

    return children;
}

export default LoadingData;