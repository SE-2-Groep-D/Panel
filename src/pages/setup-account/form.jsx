import {default as useFormData } from './hooks/useFormData.jsx'

import {Form, Button, Logo, ProgressBar, InputField, OptionSelector} from "@components";
import {useState} from "react";

function SetupForm() {
  const {formData, dispatch} = useFormData();
  const {currentStage, maxStage} = formData;

  const {onComplete, form} = getNextForm(currentStage);

  return (
      <>
        <Logo id="logo"></Logo>
        <ProgressBar stage={currentStage} maxStage={maxStage}/>
          <Form title="Test" buttonText='volgende' message='' onSubmit={(data) => {
              console.log(data);
          }}>
              {form}
          </Form>
      </>
  );
}

export default SetupForm;

function getNextForm(stage) {
    const [data, setFormData] = useState({});

    return {
        onComplete: () => {
            console.log(data);
        },
        form:
            <>
                <InputField id='name' visible onChange={(data) => data.username = data.value}>Naam</InputField>
                <InputField visible onChange={(data) => data.phonenumber = data.value}>Telefoonnummer</InputField>
                <OptionSelector onChange={(o,n) => data.type = n} options={['Ervaringsdeskundige', 'Bedrijf']}>Ik ben een</OptionSelector>
            </>

    };
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




