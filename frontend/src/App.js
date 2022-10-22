import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import SnackBar from "@mui/material/Snackbar";
// import { Alert } from "@mui/material";

// import { useState } from "react";
import LandingPage from "./LandingPage/LandingPage";
import OverviewPage from "./OverviewPage/OverviewPage";
import PageNotFoundPage from "./PageNotFoundPage/PageNotFoundPage";

const AuthenticatedRoute = ({ auth, children }) => {
  const location = useLocation();

  if (auth) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

const MyRoutes = () => {
  const auth = false;

  return (
    <Routes>
      <Route path="/" element={auth ? <OverviewPage /> : <LandingPage />} />
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
