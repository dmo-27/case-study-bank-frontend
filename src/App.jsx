import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";
import Dashboard from "./Pages/Dashboard/dashboard";
import Layout from "./components/layout";
import Home from "./Pages/Home/home";
import Transaction from "./Pages/Transaction/transaction";
import Account from "./Pages/Account/account";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/auth/protectedRoute";
import PublicRoute from "./components/auth/publicRoute";

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Layout>
                  <Account />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaction"
            element={
              <ProtectedRoute>
                <Layout>
                  <Transaction />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bill"
            element={
              <ProtectedRoute>
                <Layout>{/* <BillPayment /> */}</Layout>{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <ProtectedRoute>
                {" "}
                <Layout>{/* <Deposit /> */}</Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <Layout>{/* <Support /> */}</Layout>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
