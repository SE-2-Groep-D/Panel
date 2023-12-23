import { BrowserRouter, Routes, Route } from "react-router-dom";

import AlgemeneOnderzoek from "@pages/research/AlgemeneOnderzoek.jsx";
import Onderzoek from "@pages/research/Onderzoek.jsx";

  function Routing(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/onderzoeklist" element={<AlgemeneOnderzoek />}> </Route>
                <Route path="/onderzoek/:onderzoekId" element={<Onderzoek/>} />


            </Routes>
        </BrowserRouter>
    );
}

export default  Routing