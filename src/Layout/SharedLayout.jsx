import React from "react";
import { Outlet } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function SharedLayout() {
  return (
    <>
      <div
        className="parent"
        style={{ height: "100vh", backgroundColor: "rgb(235 235 235)" }}
      >
        <div
          className="main d-flex flex-row"
          style={{ height: "-webkit-fill-available" }}
        >
          <div
            className="sidebar-child"
            style={{ width: "19%", background: "white" }}
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
                height: "7vh",
                // boxShadow: "0px 0px 9px gray",
                // marginBottom: "1%",
                background: "white",
              }}
              // style={{ position: "sticky", top: "0px", zIndex: "100" }}
            >
              <Header />
            </div>

            <div
              className="content px-5 py-2"
              style={{
                height: "93vh",
                boxShadow: "inset 0px 0px 13px -6px gray",
                overflow: "auto",
              }}
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
