import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function GoogleButton() {
  return (
    <GoogleOAuthProvider clientId="169633306915-is0h5dvfs7e6cu1ic8ee17qjpf787qmn.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleButton;
