import React, { useCallback, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePlaidLink } from "react-plaid-link";
import { auth } from "../firebase";

const PlaidLink = () => {
  const [token, setToken] = useState(null);
  const [, setData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loadingOne, setLoading] = useState(true);
  const [user, loadingTwo] = useAuthState(auth);

  if (loadingTwo) return <p>Loading</p>;
  if (!user) return <p>User not logged in!</p>;

  const getTransactions = React.useCallback(async () => {
    setLoading(true);
    const bod = { access_token: accessToken };
    console.log("Access Token: ", accessToken);
    const response = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(bod),
    });
    const dat = await response.json();
    setData(dat);
    setLoading(false);
  }, [setData, setLoading]);

  const onSuccess = useCallback(
    async (publicToken) => {
      setLoading(true);
      console.log(publicToken);

      const idToken = await auth.currentUser.getIdToken(true);

      const bod = { public_token: publicToken };
      const response = await fetch("/api/exchange_public_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${idToken}`,
        },
        body: JSON.stringify(bod),
      });
      const aT = await response.json();
      console.log("from App: ", aT);
      setAccessToken(aT);
      await getTransactions();
    },
    [setAccessToken, getTransactions]
  );

  // Creates a Link token
  const createLinkToken = React.useCallback(async () => {
    // // For OAuth, use previously generated Link token
    // if (window.location.href.includes("?oauth_state_id=")) {
    //   const linkToken = localStorage.getItem('link_token');
    //   setToken(linkToken);
    // } else {
    console.log("hello from react create link token");
    const response = await fetch("/api/create_link_token", {});
    console.log("Response Successfully Received", response);
    const dat = await response.json();
    console.log("Response as JSON", dat);
    setToken(dat.link_token);
    // localStorage.setItem("link_token", data.link_token);
    // }
  }, [setToken]);

  let isOauth = false;

  const config = {
    token,
    onSuccess,
  };

  // For OAuth, configure the received redirect URI
  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }
  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (token == null) {
      createLinkToken();
    }
    if (isOauth && ready) {
      open();
    }
  }, [token, isOauth, ready, open]);

  return (
    <div>
      <button type="button" onClick={() => open()}>
        <strong>Link account</strong>
      </button>
    </div>
  );
};

export default PlaidLink;
