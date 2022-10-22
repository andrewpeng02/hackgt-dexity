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

const LoginPopup = () => 
  // useEffect(() => {
  //   document.getElementById("app").style.overflow = "hidden";
  // }, []);
   (
    <div>
      <h1>Log in or Sign up</h1>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={app.auth()}
        uiCallback={null}
      />
    </div>
  )
;

const LandingPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div>
      <LoginPopup setShowLogin={setShowLogin} />
      <p>Landing page</p>
    </div>
  );
};

export default LandingPage;
