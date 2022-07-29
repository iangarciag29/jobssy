import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageSwitchAccessibility from "./components/Accessibility/PageSwitchAccessibility";

const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Layout = lazy(() => import("./containers/Layout"));

function App(): JSX.Element {
  return (
    <>
      <Router>
        <PageSwitchAccessibility />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app/*" element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
