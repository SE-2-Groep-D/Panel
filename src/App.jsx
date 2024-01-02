import "@pagestyles/App.scss";

// import {SetupAccount} from "@pages";

import { Button } from "@components";
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchData } from "@services/api";
import { MultiInputSelector } from "./components/input";
import SetupAccount from "./pages/setup-account/setupAccount";
import { Register, Login, Voorbeeld } from "@pages";

import { Button } from "@components";
import { useState } from "react";
import { useEffect } from "react";

import { fetchData } from "@services/api";
import { SetupAccount } from "@pages";

function App() {
  const [data, setData] = useState(null);

  return (
    <>
      {/* <MultiInputSelector animation={false}>Hulpmiddelen</MultiInputSelector> */}

      <BrowserRouter>
        <Routes>
          <Route path="" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/voorbeeld" Component={Voorbeeld} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
