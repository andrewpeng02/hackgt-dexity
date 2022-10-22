import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import SnackBar from "@mui/material/Snackbar";
// import { Alert } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";

// import { useState } from "react";
import LandingPage from "./LandingPage/LandingPage";
import OverviewPage from "./OverviewPage/OverviewPage";
import PageNotFoundPage from "./PageNotFoundPage/PageNotFoundPage";
import { auth } from "./firebase";

const AuthenticatedRoute = ({ authenticated, children }) => {
  const location = useLocation();

  if (authenticated) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

const MyRoutes = () => {
  const [authenticated] = useAuthState(auth);

  return (
    <Routes>
      <Route
        path="/"
        element={authenticated ? <OverviewPage /> : <LandingPage />}
      />
      <Route
        path="companies"
        element={
          <AuthenticatedRoute auth={auth}>
            <p>companies</p>
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
  );
};

// const SimpleSnackBar = ({ alert, setAlert }) => (
//   <SnackBar
//     open={alert !== null}
//     autoHideDuration={6000}
//     onClose={() => {
//       setAlert(null);
//     }}
//   >
//     {alert && (
//       <Alert
//         onClose={() => {
//           setAlert(null);
//         }}
//         severity={alert.severity}
//       >
//         {alert.message}
//       </Alert>
//     )}
//   </SnackBar>
// );

const App = () => (
  // const [alert, setAlert] = useState(null);

  <div>
    <MyRoutes />
    {/* <SimpleSnackBar alert={alert} setAlert={setAlert} /> */}
  </div>
);
export default App;
