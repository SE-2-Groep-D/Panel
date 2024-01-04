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
    /*parentInfo: lazy(() => import('./form/parent-info.jsx')),
    researchInfo: lazy(() => import('./form/research-info.jsx')),
    companyForm: lazy(() => import('./form/company-info.jsx')),
    companyLocationForm: lazy(() => import('./form/company-location.jsx')),*/

}

function GetNextForm() {
    const {state, nextStep, prevStep} = useForm();
    const validUser = validateUser(state.user);
    const userType = (validUser) ? state.user.userType : null;


    switch (state.currentStep) {
        case 0:
            return PossibleForms.onderzoekStapEen;

        case 1:
            return PossibleForms.onderzoekStapTwee;

        case 2:
            if(userType === 'Ervaringsdeskundige' && validUser) {
                const ageGroup = getUserAgeGroup(state.user);

                if(ageGroup === '0 tot 10' || ageGroup === '10 tot 18') {
                    return PossibleForms.parentInfo;
                }

                if(ageGroup !== null) {
                    return PossibleForms.researchInfo;
                }
            }

            if(userType === 'Bedrijf' && validUser)
                return PossibleForms.companyLocationForm;
            break;

        case 3:
            if(userType === 'Ervaringsdeskundige' && validUser) {
                const ageGroup = getUserAgeGroup(state.user);

                if(ageGroup === '0 tot 10' || ageGroup === '10 tot 18') {
                    return PossibleForms.researchInfo;
                }
            }
            break;
    }

    console.log(state)
    return null;
}

function validateUser(user) {
    return user !== null && user !== undefined && user.userType !== null && user.userType !== undefined;
}

function getUserAgeGroup(user) {
    if(user.userType !== 'Ervaringsdeskundige') return null;
    return user.ageGroup;
}




