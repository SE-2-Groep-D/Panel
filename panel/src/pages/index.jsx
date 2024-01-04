export { default as Register } from "./register/register.jsx";
export { default as Login } from "./login/login.jsx";
export { default as Voorbeeld } from "./voorbeeld/voorbeeld.jsx";
import React from "react";

export const SetupAccount = React.lazy(() =>
  import("./setup-account/SetupAccount.jsx")
);
export const Onderzoek = React.lazy(() =>
  import("./research/OnderzoekInfo.jsx")
);