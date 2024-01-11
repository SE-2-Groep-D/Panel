import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { ApiResponseError, fetchApi } from "@api";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../setup/data/useForm";
import { useAuth } from "@hooks";
function GoogleButton() {
  const navigate = useNavigate();
  const { state } = useForm();
  const { loginUser } = useAuth();

  async function handleLoginSuccess(response) {
    try {
      const res = await fetchApi("Auth/google", "POST", {
        IdToken: response.credential,
      });
      navigate("/");
      loginUser(res.userId, res);
    } catch (error) {
      const { status } = error.response;
      const data = await error.response.json();
      switch (status) {
        case 404:
          register(data.email, true);
          break;

        case 400:
          console.log("Er ging iets mis");
          break;

        default:
          console.log("Er is een fout ontstaan, probeer het later opnieuw.");
          console.error(error.response);
          break;
      }
    }
  }

  function register(email, googleAccount) {
    state.user = { ...state.user, email, googleAccount };
    navigate("/setup");
  }

  return (
    <GoogleOAuthProvider clientId="169633306915-is0h5dvfs7e6cu1ic8ee17qjpf787qmn.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleButton;
