import { AuthProvider, ChatProvider } from "@context";
import Routing from "@pages/routes/Routing.jsx";

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Routing />
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
