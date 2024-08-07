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
import HomePage from "./pages/HomePage.jsx";
import SubjectPage from "./pages/SubjectPage.jsx";
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
        <Route path="/" element={<HomePage />} />
        <Route path="/:subject_code" element={<SubjectPage />} />
      </Route>
      <Route element={<AuthOutlet />}>
        <Route path="/auth" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
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
