import React, { useEffect, useState } from "react";
import { Button, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { sidebarData } from "./data/SidebarData";

import logo from "../static/logo.png";
export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarItems, setSidebarItems] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < sidebarData.length; i++) {
      const element = sidebarData[i];

      element.key = element.key.toLowerCase();
      arr.push(element);
    }

    setSidebarItems(arr);
  }, []);

  const click = (key) => {
    navigate(key);
  };

  return (
    <div
      // className="border"
      // className="d-flex flex-col"
      style={{ height: "100%" }}
    >
      <div
        className="sidenavLogoContainer d-flex align-items-center justify-content-start"
        style={{ height: "9vh" }}
      >
        <img
          src={logo}
          alt="Kotak Logo"
          style={{ width: "15vh", marginLeft: "9%" }}
        />
      </div>

      <div className="p-3"></div>
      <div className="p-1">
        <Menu
          onClick={({ key }) => {
            click(key);
          }}
          defaultSelectedKeys={[location.pathname.toLowerCase()]}
          // mode="inline"
          // theme="dark"
          // inlineCollapsed={true}
          items={sidebarItems}
          style={{
            border: "none",
            //  height: "80vh", padding: "6%"
          }}
        />
      </div>
    </div>
  );
}
