import React from "react";
import { Outlet } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function SharedLayout() {
  return (
    <>
      <div className="parent" style={{ height: "100vh" }}>
        <div
          className="main d-flex flex-row"
          style={{ height: "-webkit-fill-available" }}
        >
          <div className="sidebar-child" style={{ width: "19%" }}>
            <Sidebar />
          </div>
          <div
            className="content-child"
            style={{ width: "-webkit-fill-available" }}
          >
            <div
              className="child"
              style={{ height: "7vh" }}
              // style={{ position: "sticky", top: "0px", zIndex: "100" }}
            >
              <Header />
            </div>

            <div
              className="content px-5 py-2"
              style={{ height: "93vh", backgroundColor: "rgb(235 235 235)" }}
            >
              <BreadCrumb />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SharedLayout;
