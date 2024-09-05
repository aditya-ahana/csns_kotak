import React, { Fragment } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import logo from "../static/logo.png";

import LanguageSelector from "./LanguageSelector";

function Header() {
  return (
    <Fragment>
      <Typography
        data-testid="header"
        component="span"
        noWrap
        // component="div"
        className="d-flex justify-content-between align-items-center"
        style={{
          width: "-webkit-fill-available",
          // fontWeight: "800",
        }}
      >
        <img
          src={logo}
          alt="Kotak Logo"
          // style={{ width: "11%", height: "fit-content" }}
          style={{ width: "11%", height: "2.75rem" }}
        />
        <div
          className="d-flex justify-content-between align-items-center"
          data-testid="header-profile"
        >
          <LanguageSelector datatestid="language-dropdown" />
          <div className="p-3"></div>
          <FaRegUserCircle />
          <div className="p-1"></div>
          <span data-testid="header-username" className="fw-bold">
            Admin
          </span>
        </div>
      </Typography>
    </Fragment>
  );
}

export default Header;
