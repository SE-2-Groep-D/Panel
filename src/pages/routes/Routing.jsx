// Routing.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
    Home,
    Login,
    Navigation,
    Onderzoeken,
    OnderzoekForm,
    OnderzoekInfo,
    OnderzoekResultaten,
    PrivacyStatement,
    Register,
    SetupAccount,
    UserHome,
} from "@pages";

import { Suspense } from "react";
import { LoadingDiv } from "@components";
import PrivateRoute from "@pages/routes/ProtectedRoute.jsx";
import {useAuth} from "@hooks";

function Routing() {
    return (
        <BrowserRouter>
            <Navigation />
            <Suspense fallback={<LoadingDiv loading={true} />}>
                <Routes>
                    <Route path="/" element={<HomeRoute />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/setup" element={<SetupAccount />} />
                    <Route path="/privacy" element={<PrivacyStatement />} />


                    <Route element={<PrivateRoute/>}>
                        <Route path="/onderzoek" element={<Onderzoeken />} />
                        <Route path="/onderzoek/:onderzoekId" element={<OnderzoekInfo />} />
                        <Route path="/onderzoek/:id/results" element={<OnderzoekResultaten />} />
                        <Route path="/onderzoek/aanmaken" element={<OnderzoekForm />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

const HomeRoute = () => {
    const { authenticated } = useAuth();
    return authenticated ? <UserHome /> : <Home />;
};

export default Routing;
