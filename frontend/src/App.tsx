import React, { Suspense } from "react";
import {
  loginPage,
  logoutPage,
  landingPage,
  dashboardPage,
  projectPage,
} from "./constants";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import PrivateRoute from "./auth/PrivateRoute";
import Logout from "./pages/logout/Logout";
import Login from "./pages/login/Login";

const Landing = React.lazy(() => import("./pages/landing/Landing"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const Projects = React.lazy(() => import("./pages/projects/Projects"));

const ROUTES = {
  public: [
    { path: landingPage, element: <Landing /> },
    {
      path: loginPage,
      element: <Login />,
    },
    {
      path: logoutPage,
      element: <Logout />,
    },
  ],
  private: [
    {
      path: dashboardPage,
      element: <Dashboard />,
    },
    {
      path: `${projectPage}/:projectId/:sectionId`,
      element: <Projects />,
    },
  ],
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          {/* PUBLIC ROUTES */}
          {ROUTES.public.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {/* PRIVATE ROUTES */}
          <Route element={<PrivateRoute />}>
            {ROUTES.private.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {/* </Router> */}
    </BrowserRouter>
  );
};

export default App;
