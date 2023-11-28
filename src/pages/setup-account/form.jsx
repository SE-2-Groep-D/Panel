import React, { useState } from 'react'

import BStage1 from '@pages/setup-account/bedrijf/stage1.jsx'
import BStage2 from '@pages/setup-account/bedrijf/stage2.jsx'

import EStage1 from '@pages/setup-account/ervaringsdeskundige/stage1.jsx'
import EStage2 from '@pages/setup-account/ervaringsdeskundige/stage2.jsx'

import Checkbox from "@components/input/checkbox.jsx";
import DefaultForm from "@pages/setup-account/default-form.jsx";
import InputField from "@components/input/inputfield.jsx";
import OptionsSelector from "@components/input/optionselector.jsx";


export default function Form({moveOut, stage}) {
    const [type, setType] = useState(null);
    const cb = (type === 'Ervaringsdeskundige') ? <Checkbox>Ik ben ouder dan 18 jaar.</Checkbox> : <> </>;

    console.log(stage);

    if(type !== undefined && type !== null && stage > 0) {
        switch (type) {
            case 'Bedrijf':
                return <BedrijfsForm stage={stage}/>
            default:
                return <ErvaringsdeskundigeForm stage={stage}/>
        }
    }
    return (
        <DefaultForm
            moveOut={moveOut}
            title='Account'
        >
            <InputField visible>Naam</InputField>
            <InputField visible>Telefoonnummer</InputField>
            <OptionsSelector onChange={(o,n) => setType(n)} options={['Ervaringsdeskundige', 'Bedrijf']}>Ik ben een</OptionsSelector>
            {cb}
        </DefaultForm>
    );

}

const ErvaringsdeskundigeForm = ({stage}) => {
    switch (stage) {
        case 2:
            return <EStage2 stage={stage}/>
        case 1:
            return <EStage1 stage={stage}/>
    }
}

const BedrijfsForm = ({stage}) => {
    switch (stage) {
        case 2:
            return <BStage2 stage={stage}/>
        case 1:
            return <BStage1 stage={stage}/>
    }
}




