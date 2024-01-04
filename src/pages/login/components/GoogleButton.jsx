function GoogleButton() {
  function handleClick(e) {}

  return (
    <button id="googleSingInButton" onClick={handleClick}>
      <img id="googleIcon" src="GooglegoogleIcon.png" />
      <span>Sign in with Google</span>
    </button>
  );
}

export default GoogleButton;
