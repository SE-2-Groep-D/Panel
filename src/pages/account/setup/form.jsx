import { lazy, Suspense } from "react";
import { LoadingDiv, Logo, ProgressBar} from "@components";

import { useForm } from "./data/useForm.jsx";

function SetupForm() {
  const formData = useForm();
  return (
      <>
          <LazyForm data={formData}/>
      </>
  );
}


function LazyForm() {
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
  confirmData: lazy(() => import("./form/confirm-data.jsx")),
};

function GetNextForm() {
  const { state } = useForm();
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

  return PossibleForms.confirmData;
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

