import { useState } from "react";
import firebase from "firebase/compat/app";
import StyledFirebaseAuth from "../StyledFirebaseAuth";
import "firebase/compat/auth";
import { app } from "../firebase";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

const LoginPopup = () => (
  // useEffect(() => {
  //   document.getElementById("app").style.overflow = "hidden";
  // }, []);
  <div>
    <h1>Log in or Sign up</h1>
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={app.auth()}
      uiCallback={null}
    />
  </div>
);

const Header = () => (
  <div className="py-5 px-4 flex justify-between items-center">
    <h1 className="font-bold">Dexity</h1>
    <div>
      <button
        type="button"
        className="w-24 h-8 bg-orange text-white rounded-[20px] mr-4"
      >
        Sign Up
      </button>
      <button
        type="button"
        className="w-24 h-8 bg-green text-white rounded-[20px]"
      >
        Log In
      </button>
    </div>
  </div>
);

const LandingPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Header />

      <p>Landing page</p>
    </div>
  );
};

export default LandingPage;
