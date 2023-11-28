import React, { useState } from 'react'

import InputField from '@components/input/InputField';
import OptionsSelector from '@components/input/optionselector'

export default function Form({moveOut, stage}) {
    const [type, setType] = useState('');

  return (
    <DefaultForm 
        moveOut={moveOut}
        title='Account'
    >
        <InputField visible>Naam</InputField>
        <InputField visible>Telefoonnummer</InputField>
        <OptionsSelector options={['Ervaringsdeskundige', 'Bedrijf']}>Ik ben een</OptionsSelector>
    </DefaultForm>
  )
}

const DefaultForm = ({title, moveOut, children}) => {
    return (
        <div id="account-form" className={moveOut}>
             <h1 className='form-title'>{title}</h1>
             {children}
        </div>
    );
}
