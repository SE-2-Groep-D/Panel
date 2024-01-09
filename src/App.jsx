import "@pagestyles/App.scss";

import {AuthProvider} from "@context";
import Routing from "./Routing.jsx";

function App() {
  return <AuthProvider>
      <Routing/>
  </AuthProvider>
}



export default App;
