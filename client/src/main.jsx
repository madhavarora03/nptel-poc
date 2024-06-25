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
import ValidationPage from "./pages/ValidationPage.jsx";
import SubjectPage from "./pages/SubjectPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="*" element={<div>404 not found!</div>} />
      <Route path="/" element={<HomePage />} />
      <Route path="/validation" element={<ValidationPage />} />
      <Route path="/validation/:subject_code" element={<SubjectPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
