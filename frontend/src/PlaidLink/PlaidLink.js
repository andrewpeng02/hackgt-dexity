/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, { useCallback, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePlaidLink } from "react-plaid-link";
import { auth } from "../firebase";

const PlaidLink = ({ setRefresh }) => {
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    const response = await fetch("/api/create_link_token", {
      method: "POST",
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };
  useEffect(() => {
    generateToken();
  }, []);
  return linkToken != null ? (
    <Link linkToken={linkToken} setRefresh={setRefresh} />
  ) : (
    <></>
  );
};
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link

const Link = (props) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    async function inner() {
      const idToken = await auth.currentUser.getIdToken(true);

      // send public_token to server
      const response = await fetch("/api/exchange_public_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${idToken}`,
        },
        body: JSON.stringify({ public_token }),
      });
      // Handle response ...
      props.setRefresh(true); // move to end of function later
    }
    inner();
  }, []);
  const config = {
    token: props.linkToken,
    // receivedRedirectUri: window.location.href,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="border-none bg-green text-white px-6 py-4"
    >
      Link account
    </button>
  );
};

// const PlaidLink = ({ setRefresh, setLoading2 }) => {
//   const [token, setToken] = useState(null);
//   const [, setData] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);
//   // eslint-disable-next-line no-unused-vars
//   const [loadingOne, setLoading] = useState(true);
//   const [user, loadingTwo] = useAuthState(auth);

//   if (loadingTwo) return <p>Loading</p>;
//   if (!user) return <p>User not logged in!</p>;

//   const getTransactions = React.useCallback(async () => {
//     setLoading(true);
//     const bod = { access_token: accessToken };
//     console.log("Access Token: ", accessToken);
//     const response = await fetch("/api/transactions", {
//       method: "POST",
//       body: JSON.stringify(bod),
//     });
//     const dat = await response.json();
//     setData(dat);
//     setLoading(false);
//   }, [setData, setLoading]);

//   const onSuccess = useCallback(
//     async (publicToken) => {
//       setLoading(true);
//       setLoading2(true);
//       console.log(publicToken);

//       const idToken = await auth.currentUser.getIdToken(true);

//       const bod = { public_token: publicToken };
//       const response = await fetch("/api/exchange_public_token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `bearer ${idToken}`,
//         },
//         body: JSON.stringify(bod),
//       });
//       const aT = await response.json();
//       console.log("from App: ", aT);

//       setRefresh(true); // move to end of function later

//       setAccessToken(aT);
//       await getTransactions();
//     },
//     [setAccessToken, getTransactions]
//   );

//   // Creates a Link token
//   const createLinkToken = React.useCallback(async () => {
//     // // For OAuth, use previously generated Link token
//     // if (window.location.href.includes("?oauth_state_id=")) {
//     //   const linkToken = localStorage.getItem('link_token');
//     //   setToken(linkToken);
//     // } else {
//     console.log("hello from react create link token");
//     const response = await fetch("/api/create_link_token", {});
//     console.log("Response Successfully Received", response);
//     const dat = await response.json();
//     console.log("Response as JSON", dat);
//     setToken(dat.link_token);
//     // localStorage.setItem("link_token", data.link_token);
//     // }
//   }, [setToken]);

//   let isOauth = false;

//   const config = {
//     token,
//     onSuccess,
//   };

//   // For OAuth, configure the received redirect URI
//   if (window.location.href.includes("?oauth_state_id=")) {
//     config.receivedRedirectUri = window.location.href;
//     isOauth = true;
//   }
//   const { open, ready } = usePlaidLink(config);

//   useEffect(() => {
//     if (token == null) {
//       createLinkToken();
//     }
//     if (isOauth && ready) {
//       open();
//     }
//   }, [token, isOauth, ready, open]);

//   return (
//     <div>
//       <button type="button" onClick={() => open()}>
//         <strong>Link account</strong>
//       </button>
//     </div>
//   );
// };

export default PlaidLink;
