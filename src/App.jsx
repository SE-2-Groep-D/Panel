import {AuthProvider} from "@context";
import Routing from "@pages/routes/Routing.jsx";



function App() {
  return <AuthProvider>
      <Routing/>
  </AuthProvider>
}



export default App;
