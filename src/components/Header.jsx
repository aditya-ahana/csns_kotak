import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import logo from "../static/logo.png";

import LanguageSelector from "./LanguageSelector";

export default function Header() {
  return (
    <>
      <Typography
        variant="h7"
        noWrap
        component="div"
        className="d-flex justify-content-between align-items-center"
        style={{
          width: "-webkit-fill-available",
        }}
      >
        <img
          src={logo}
          alt="Kotak Logo"
          style={{ width: "11%", height: "fit-content" }}
        />
        <div className="d-flex justify-content-between align-items-center">
          <LanguageSelector />
          <div className="p-1"></div>
          <FaRegUserCircle />
          <div className="p-1"></div>
          <span>Admin</span>
        </div>
      </Typography>
    </>
  );
}
