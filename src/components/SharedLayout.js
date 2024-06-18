import React from "react";
import { Outlet } from "react-router-dom";
import BreadcrumbsComponent from "./BreadCumbsComponent";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import SidebarComp from "./SideBarComp";

function SharedLayout() {
  return (
    <>
      <div className="parent" style={{ height: "100vh" }}>
        <div
          className="main d-flex flex-row"
          style={{ height: "-webkit-fill-available" }}
        >
          <div className="sidebar-child" style={{ width: "21%" }}>
            <Sidebar />
          </div>
          <div
            className="content-child"
            style={{ width: "-webkit-fill-available" }}
          >
            <div
              className="child"
              style={{ position: "sticky", top: "0px", zIndex: "100" }}
            >
              <Header />
              <div
                style={
                  {
                    // position: "relative",
                    // top: "-6px",
                    // backgroundColor: "white",
                  }
                }
              >
                <BreadcrumbsComponent />
              </div>
            </div>

            <div
              className="content"
              style={{ backgroundColor: "rgb(235 235 235)" }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SharedLayout;
