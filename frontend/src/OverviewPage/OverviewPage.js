import { useEffect } from "react";
import { auth } from "../firebase";

const OverviewPage = () => {
  useEffect(() => {
    auth.signOut();
  }, []);
  
  return (
  <div>
    <p className="font-bold">Overview page</p>
  </div>
)};

export default OverviewPage;
