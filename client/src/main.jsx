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
import ValidationPage from "./pages/faculty/ValidationPage.jsx";
import SubjectPage from "./pages/faculty/SubjectPage.jsx";
import SignInPage from "./pages/student/SignInPage.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="*" element={<div>404 not found!</div>} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<StudentHomePage />} />
        <Route path="/validation" element={<ValidationPage />} />
        <Route path="/validation/:subject_code" element={<SubjectPage />} />
      </Route>
      <Route path="/auth" element={<SignInPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
