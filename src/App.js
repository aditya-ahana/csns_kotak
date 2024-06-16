import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Login from "./components/Login/Login";

import Dashboard from "./components/Pages/Dashboard/Dashboard";
import CreateRequest from "./components/Pages/CreateRequest/CreateRequest";
import ViewUpdate from "./components/Pages/ViewUpdate/ViewUpdate";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Dashboard />} path="/Dashboard" />
          <Route element={<CreateRequest />} path="/CreateRequest" />
          <Route element={<ViewUpdate />} path="/ViewUpdate" />
        </Routes>
      </BrowserRouter>
    </>
  );
}
