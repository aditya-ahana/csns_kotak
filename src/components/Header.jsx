import React from "react";
import { Button } from "@mui/material";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import logo from "../static/logo.png";

export default function Header() {
  return (
    <>
      <div
        className="d-flex flex-row align-items-center justify-content-between p-3"
        style={{ height: "100%", width: "100%" }}
      >
        <div className="headerLogoContainer col-md-2">
          <img src={logo} alt="Kotak Logo" style={{ width: "60%" }} />
        </div>

        <div className="headerUserContainer col-md-1">
          <div className="d-flex justify-content-end align-items center">
            <FaRegUserCircle />
            <div className="p-1"></div>
            <span>Admin</span>
          </div>
        </div>
      </div>
      {/* <div
        className="headerContainer d-flex align-items-center justify-content-end"
        style={{ height: "-webkit-fill-available" }}
      >
        <div className="headerContent" style={{ width: "15%" }}>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaRegUserCircle />
              <div className="p-1"></div>
              <span>Admin</span>
            </div>
            <Button style={{ color: "black" }}>
              <FiLogOut />
            </Button>
            <div className="p-1"></div>
          </div>
        </div>
      </div> */}
    </>
  );
}
