import "@pagestyles/App.scss";

import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Login, Voorbeeld } from "@pages";

import { fetchData } from "@services/api";
import { SetupAccount } from "@pages";

function App() {
  const [data, setData] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/voorbeeld" Component={Voorbeeld} />
          <Route path="/setupAccount" element={<SetupAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
