import '@styles/main.scss'
import "@pagestyles/App.scss";

import {AuthProvider} from "@context";
import Routing from "@pages/routes/Routing.jsx";
import {useLocation} from "react-router-dom";
import {useAuth} from "@hooks";



function App() {
  return <AuthProvider>
      <Routing/>
  </AuthProvider>
}



export default App;
