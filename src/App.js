import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Login from "./pages/login/Login";

import Dashboard from "./pages/dashboard/Dashboard";
import CreateRequest from "./pages/createRequest/CreateRequest";
import ViewUpdate from "./pages/viewUpdate/ViewUpdate";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import WithNav from "./Layout/WithNav";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />

          <Route element={<WithNav />}>
            <Route element={<Sidebar />} />
            <Route element={<Header />} />
            <Route element={<Dashboard />} path="/Dashboard" />
            <Route element={<CreateRequest />} path="/CreateRequest" />
            <Route element={<ViewUpdate />} path="/ViewUpdate" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
