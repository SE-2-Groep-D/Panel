import {lazy, Suspense} from 'react';
import {LoadingDiv} from '@components';


function SetupForm({data}) {
    const {currentStep} = data;
    const StageForm = getNextForm(currentStep);


    return (
        <Suspense fallback={<LoadingDiv loading/>}>
            {(StageForm)? <StageForm /> : <LoadingDiv loading/>}
          </Suspense>
    );
}

export default SetupForm;




const PossibleForms = {
    startForm: lazy(() => import('./form/start-form.jsx')),
    researchForm: lazy(() => import('./form/research.jsx')),
    companyForm: lazy(() => import('./form/company.jsx')),
}

function getNextForm(step, formData) {
    // const user = (formData.user === null || formData.user === undefined) ? undefined : formData.user;
    // const accountType = (user === undefined) ? undefined : user.accountType;


    // if(stage === 1 && accountType === 'Bedrijf') return PossibleForms.companyForm;
    // if(stage === 1 && accountType === 'Ervaringsdeskundige') return PossibleForms.researchForm;

    return PossibleForms.startForm;
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




