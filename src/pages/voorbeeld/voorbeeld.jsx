import { useLocation } from "react-router-dom";

function Voorbeeld() {
  const location = useLocation();
  return <h1>{location.state.email}</h1>;
}

export default Voorbeeld;
