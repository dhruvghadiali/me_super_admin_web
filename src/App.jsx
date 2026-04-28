import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@MEContexts/themeProvider.jsx";
import {
  STATES,
  CITIES,
  SIGN_IN,
  SCHOOLS,
  ZIPCODES,
  DASHBOARD,
  DISTRICTS,
  AREA_NAMES,
  FACILITY_TYPES,
} from "@MEUtils/pageRoutes";

// HOC components
import AuthChecker from "@MECommonComponents/hoc/authChecker";
import PublicRoute from "@MECommonComponents/hoc/PublicRoute";
import ProtectedRoute from "@MECommonComponents/hoc/protectedRoute";

// Layout
import MESidebarComponent from "@MECommonComponents/sidebar";

// Pages
import SigninPage from "@MEPages/signinPage";
import StatesPage from "@MEPages/statesPage";
import SchoolsPage from "@MEPages/schoolsPage";
import DistrictsPage from "@MEPages/districtsPage";
import FacilityTypesPage from "@MEPages/facilityTypesPage";
import NotFoundPage from "@MEPages/notFoundPage";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AuthChecker>
          <Routes>
            <Route
              path={SIGN_IN}
              element={
                <PublicRoute
                  redirectAuthenticated={true}
                  redirectTo={DASHBOARD}
                >
                  <SigninPage />
                </PublicRoute>
              }
            />
            <Route
              path={DASHBOARD}
              element={
                <ProtectedRoute>
                  <MESidebarComponent>
                    <> dashboard </>
                  </MESidebarComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path={SCHOOLS}
              element={
                <ProtectedRoute>
                  <MESidebarComponent>
                    <SchoolsPage />
                  </MESidebarComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path={FACILITY_TYPES}
              element={
                <ProtectedRoute>
                  <MESidebarComponent>
                    <FacilityTypesPage />
                  </MESidebarComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path={STATES}
              element={
                <ProtectedRoute>
                  <MESidebarComponent>
                    <StatesPage />
                  </MESidebarComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path={DISTRICTS}
              element={
                <ProtectedRoute>
                  <MESidebarComponent>
                    <DistrictsPage />
                  </MESidebarComponent>
                </ProtectedRoute>
              }
            />
            {/* Catch-all route for 404 Not Found */}
            <Route
              path="*"
              element={
                <MESidebarComponent>
                  <NotFoundPage />
                </MESidebarComponent>
              }
            />
          </Routes>
        </AuthChecker>
      </Router>
    </ThemeProvider>
  );
};

export default App;
NotFoundPage;
