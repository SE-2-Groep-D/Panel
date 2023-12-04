import {default as useFormData } from './hooks/useFormData.jsx'

import {Form, Button, Logo, ProgressBar, InputField, OptionSelector} from "@components";

import StartForm from "@pages/setup-account/components/start-form.jsx";
import {useState} from "react";

function SetupForm() {
  const {formData, dispatch} = useFormData();
  const {currentStage, maxStage} = formData;

  const StageForm = getNextForm(currentStage);

  return (
      <>
          <Logo id="logo"> </Logo>
          <ProgressBar stage={currentStage} maxStage={maxStage}/>
          {StageForm}
      </>
  );
}

export default SetupForm;

function getNextForm(stage) {
    switch (stage) {
        case 0:
            return <StartForm/>
    }
}

// function createNewForm(form, onComplete) {
//     return {onComplete: onComplete, form: form};
// }

// export default function Form({moveOut, stage}) {
//     const [type, setType] = useState(null);
//     const cb = (type === 'Ervaringsdeskundige') ? <Checkbox>Ik ben ouder dan 18 jaar.</Checkbox> : <> </>;

//     console.log(stage);

//     if(type !== undefined && type !== null && stage > 0) {
//         switch (type) {
//             case 'Bedrijf':
//                 return <BedrijfsForm stage={stage}/>
//             default:
//                 return <ErvaringsdeskundigeForm stage={stage}/>
//         }
//     }
//     return (
//         <DefaultForm
//             moveOut={moveOut}
//             title='Account'
//         >
//             <InputField visible>Naam</InputField>
//             <InputField visible>Telefoonnummer</InputField>
//             <OptionsSelector onChange={(o,n) => setType(n)} options={['Ervaringsdeskundige', 'Bedrijf']}>Ik ben een</OptionsSelector>
//             {cb}
//             <Button onClick={nextStage}>Volgende</Button>
//         </DefaultForm>
//     );

// }

// const ErvaringsdeskundigeForm = ({stage}) => {
//     switch (stage) {
//         case 2:
//             return <EStage2 stage={stage}/>
//         case 1:
//             return <EStage1 stage={stage}/>
//     }
// }

// const BedrijfsForm = ({stage}) => {
//     switch (stage) {
//         case 2:
//             return <BStage2 stage={stage}/>
//         case 1:
//             return <BStage1 stage={stage}/>
//     }
// }




