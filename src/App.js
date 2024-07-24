import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Login from "./pages/Login/Login";

import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRequest from "./pages/CreateRequest/CreateRequest";
import ViewRequest from "./pages/ViewRequest/ViewRequest";
import ViewRequestDetails from "./pages/ViewRequest/ViewRequestDetails";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import WithNav from "./Layout/WithNav";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastContainer autoClose={3000} />
        <BrowserRouter>
          <Routes>
            {/* <Route element={<Login />} path="/" /> */}

            <Route element={<WithNav />}>
              <Route element={<Sidebar />} />
              <Route element={<Header />} />
              <Route element={<Dashboard />} path="/" />
              <Route element={<CreateRequest />} path="/CreateRequest" />
              <Route element={<ViewRequest />} path="/ViewRequest" />
              <Route
                element={<ViewRequestDetails />}
                path="/ViewRequest/ViewRequestDetails"
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </>
  );
}
