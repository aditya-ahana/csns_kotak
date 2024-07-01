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
          <div
            className="sidebar-child"
            style={{ width: "25.5%", background: "white" }}
          >
            <Sidebar />
          </div>
          <div
            className="content-child"
            style={{ width: "-webkit-fill-available" }}
          >
            <div
              className="child"
              style={{
                height: "9vh",
                // boxShadow: "0px 0px 9px gray",
                // marginBottom: "1%",
                background: "white",
              }}
              // style={{ position: "sticky", top: "0px", zIndex: "100" }}
            >
              <Header />
            </div>

            <div
              className="content px-4 py-3"
              style={{
                height: "91vh",
                boxShadow: "inset 0px 0px 13px -6px gray",
                overflow: "auto",
              }}
            >
              <BreadCrumb />

              <div className="py-2">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SharedLayout;
