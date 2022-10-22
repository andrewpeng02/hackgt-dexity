import { useState } from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

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
    <h2 className="font-bold text-lg">Dexity</h2>
    <div>
      <button
        type="button"
        className="font-roboto te w-24 h-8 bg-orange text-white rounded-[20px] mr-4"
      >
        Sign Up
      </button>
      <button
        type="button"
        className="font-roboto w-24 h-8 bg-green text-white rounded-[20px]"
      >
        Log In
      </button>
    </div>
  </div>
);

const Splash = () => (
  <div
    className="bg-darkBlue h-[850px] flex-row justify-center items-center 
                    bg-splash-pattern bg-clip-border bg-no-repeat bg-bottom bg-contain lg:bg-auto"
  >
    <h1 className="text-white font-semibold text-[62px] text-center leading-[72px] pt-[78px]">
      Construct a portfolio
    </h1>
    <h1 className="text-green font-semibold text-[53px] text-center leading-[72px] -mt-4">
      with your daily purchases
    </h1>
    <p className="font-roboto text-gray text-[20px] text-center">
      Make a personal, curated index fund based on the everyday items you
      purchase
    </p>
    <div className="flex justify-center items-center mt-[18px]">
      <button
        type="button"
        className="font-roboto font-bold w-[148px] h-[55px] bg-orange text-white rounded-[200px] mr-4"
      >
        Sign Up
      </button>
      <button
        type="button"
        className="font-roboto font-bold w-[148px] h-[55px] bg-green text-white rounded-[200px]"
      >
        Log In
      </button>
    </div>
  </div>
);

const Footer = () => (
  <div className="flex items-center justify-between px-[82px] py-[15px]">
    <p className="font-roboto text-[#78868F] text-[13px]">Copyright © 2022, dexity.us</p>
    <div className="flex">
      <p className="font-roboto text-[#48575F] text-[14px] mr-4">Contact</p>
      <p className="font-roboto text-[#48575F] text-[14px] mr-8">Privacy</p>
      <LinkedInIcon className="mr-2" />
      <InstagramIcon />
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
      <Splash />
      <Footer />
    </div>
  );
};

export default LandingPage;
