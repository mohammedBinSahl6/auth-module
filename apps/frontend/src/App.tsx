import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/auth-provider";
import { ProtectedRoute } from "./routes/protected-route";
import { SigninForm } from "./features/auth/components/signin-form";
import { SignupForm } from "./features/auth/components/signup-form";
import { AuthLayout } from "./pages/auth-layout";
import { ApplicationPage } from "./pages/application-page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/app" replace />} />
            
            {/* Public Auth Routes */}
            <Route
              path="/signin"
              element={
                <AuthLayout>
                  <SigninForm />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout>
                  <SignupForm />
                </AuthLayout>
              }
            />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/app" element={<ApplicationPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
