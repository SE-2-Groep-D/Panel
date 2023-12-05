import '@pagestyles/App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAccount from './pages/login/loginAccount';
import SetupAccount from "@pages/setup-account/setupAccount.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginAccount />} />
                {/* other routes */}
                <Route path="/setupAccount" element={<SetupAccount />} />
            </Routes>
        </Router>
    );

}

export default App
