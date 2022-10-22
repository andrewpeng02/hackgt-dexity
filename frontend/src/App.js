import { Outlet, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import OverviewPage from "./OverviewPage/OverviewPage";
import PageNotFoundPage from "./PageNotFoundPage/PageNotFoundPage";

const App = () => {
  const auth = true;

  return (
    <Routes>
      {!auth ? (
        <Route path="/" element={<LandingPage />} />
      ) : (
        <Route
          path="/"
          element={
            <div>
              <Outlet />
            </div>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="companies" element={<p>companies</p>} />
        </Route>
      )}
      {/* <Route
        path="/settings"
        element={
          <AuthenticatedRoute auth={auth}>
            <p>dashboard</p>
          </AuthenticatedRoute>
        }
       /> */}
      <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
  );
};

export default App;
