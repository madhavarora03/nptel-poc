import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import StudentHomePage from "./pages/student/HomePage.jsx";
import ValidationPage from "./pages/teacher/ValidationPage.jsx";
import SubjectPage from "./pages/teacher/SubjectPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AuthOutlet from "./components/AuthOutlet.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="*" element={<div>404 not found!</div>} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<StudentHomePage />} />
        <Route path="/validation" element={<ValidationPage />} />
        <Route path="/validation/:subject_code" element={<SubjectPage />} />
      </Route>
      <Route element={<AuthOutlet />}>
        <Route path="/auth" element={<SignInPage />} />
        <Route path="/auth/register" element={<SignUpPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
