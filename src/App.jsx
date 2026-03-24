import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DASHBOARD, SIGN_IN } from "@MEUtils/pageRoutes";

import { ThemeProvider } from "@MEContexts/themeProvider.jsx";

import AuthChecker from "@MECommonComponents/hoc/authChecker";
import PublicRoute from "@MECommonComponents/hoc/PublicRoute";
import ProtectedRoute from "@MECommonComponents/hoc/protectedRoute";


function App() {
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
                  <> sign in</>
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
}

export default App;
