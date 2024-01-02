import { lazy, Suspense } from "react";
import { LoadingDiv, Form } from "@components";

import { useForm } from "./data/useForm.jsx";

function SetupForm() {
  const StageForm = GetNextForm();

  return (
    <Suspense fallback={<LoadingDiv loading />}>
      {StageForm ? <StageForm /> : <LoadingDiv loading />}
    </Suspense>
  );
}

export default SetupForm;

const PossibleForms = {
  accountInfo: lazy(() => import("./form/account-info.jsx")),
  personalInfo: lazy(() => import("./form/personal-info.jsx")),
  parentInfo: lazy(() => import("./form/parent-info.jsx")),
  researchInfo: lazy(() => import("./form/research-info.jsx")),
  companyForm: lazy(() => import("./form/company-info.jsx")),
  companyLocationForm: lazy(() => import("./form/company-location.jsx")),
};

function GetNextForm() {
  const { state, nextStep, prevStep } = useForm();
  const validUser = validateUser(state.user);
  const userType = validUser ? state.user.userType : null;

  switch (state.currentStep) {
    case 0:
      return PossibleForms.accountInfo;

    case 1:
      if (userType === "Ervaringsdeskundige" && validUser)
        return PossibleForms.personalInfo;
      if (userType === "Bedrijf" && validUser) return PossibleForms.companyForm;
      break;

    case 2:
      if (userType === "Ervaringsdeskundige" && validUser) {
        const ageGroup = getUserAgeGroup(state.user);

        if (ageGroup === "0 tot 10" || ageGroup === "10 tot 18") {
          return PossibleForms.parentInfo;
        }

        if (ageGroup !== null) {
          return PossibleForms.researchInfo;
        }
      }

      if (userType === "Bedrijf" && validUser)
        return PossibleForms.companyLocationForm;
      break;

    case 3:
      if (userType === "Ervaringsdeskundige" && validUser) {
        const ageGroup = getUserAgeGroup(state.user);

        if (ageGroup === "0 tot 10" || ageGroup === "10 tot 18") {
          return PossibleForms.researchInfo;
        }
      }
      break;
  }

  console.log(state);
  return null;
}

function validateUser(user) {
  return (
    user !== null &&
    user !== undefined &&
    user.userType !== null &&
    user.userType !== undefined
  );
}

function getUserAgeGroup(user) {
  if (user.userType !== "Ervaringsdeskundige") return null;
  return user.ageGroup;
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
