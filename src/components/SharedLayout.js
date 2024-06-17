import React from "react";
import { Outlet } from "react-router-dom";
import BreadcrumbsComponent from "./BreadCumbsComponent";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import SidebarComp from "./SideBarComp";

function SharedLayout() {
  return (
    <>
      <div className="parent">
        <div className="main">
          <div className="sidebar-child">
            <Sidebar />
          </div>
          <div className="content-child ">
            <div
              className="child"
              style={{ position: "sticky", top: "0px", zIndex: "100" }}
            >
              <Header />
              <div
                style={{
                  position: "relative",
                  top: "-6px",
                  backgroundColor: "white",
                }}
              >
                <BreadcrumbsComponent />
              </div>
            </div>

            <div className="content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SharedLayout;
