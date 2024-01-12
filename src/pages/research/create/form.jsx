import {lazy, Suspense} from 'react';


import {useForm} from './data/useForm.jsx';
import {LoadingDiv} from "@components";

function SetupForm() {
    const StageForm = GetNextForm();

    return (
        <Suspense fallback={<LoadingDiv loading/>}>
            {(StageForm)? <StageForm /> : <LoadingDiv loading/>}
        </Suspense>

    );
}

export default SetupForm;




const PossibleForms = {
    onderzoekStapEen: lazy(() => import('./form/onderzoekStapEen.jsx')),
    onderzoekStapTwee: lazy(() => import('./form/onderzoekStapTwee.jsx')),
   // onderzoekStapDrie:lazy(()=>import('./form/onderzoekStapDrie.jsx'))
    /*parentInfo: lazy(() => import('./form/parent-info.jsx')),
    researchInfo: lazy(() => import('./form/research-info.jsx')),
    companyForm: lazy(() => import('./form/company-info.jsx')),
    companyLocationForm: lazy(() => import('./form/company-location.jsx')),*/

}

function GetNextForm() {
    const {state} = useForm();

    switch (state.currentStep) {
        case 0:
            return PossibleForms.onderzoekStapEen;
        case 1:
            return PossibleForms.onderzoekStapTwee;
      /*  case 2:
            return PossibleForms.onderzoekStapDrie;
*/
        default:
            console.log("Onbekende stap: ", state.currentStep);
            return null;
    }
}





