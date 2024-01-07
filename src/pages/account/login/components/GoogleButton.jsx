//import Cookies from "universal-cookie";

function GoogleButton() {
  //const cookies = new Cookies();

  async function handleClick() {
    //console.log(`Bearer ${cookies.get("access_token")}`);
    try {
      const response = await fetch("https://localhost:5000/auth/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let data = response.ok
        ? await response.text()
        : response.status === 400
        ? await response.text()
        : console.log("Login failed.");
      console.log(data || "No data");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <button id="googleSingInButton" onClick={handleClick}>
      <img id="googleIcon" src="GooglegoogleIcon.png" />
      <span>Sign in with Google</span>
    </button>
  );
}

export default GoogleButton;
