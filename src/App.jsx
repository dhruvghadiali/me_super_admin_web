import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DASHBOARD, SIGN_IN } from "@MEUtils/pageRoutes";

import { ThemeProvider } from "@MEContexts/themeProvider.jsx";

// HOC components
import AuthChecker from "@MECommonComponents/hoc/authChecker";
import PublicRoute from "@MECommonComponents/hoc/PublicRoute";
import ProtectedRoute from "@MECommonComponents/hoc/protectedRoute";

// Pages
import SigninPage from "@MEPages/signinPage";

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
                  <> dashboard </>
                  {/* <MESidebar>
                    <DashboardPage />
                  </MESidebar> */}
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthChecker>
      </Router>
    </ThemeProvider>
  );
};

export default App;
