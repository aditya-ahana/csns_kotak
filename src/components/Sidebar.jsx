// const { createRoot } = ReactDOM;
// const { useState } = React;
// const {
//   AppstoreOutlined,
//   ContainerOutlined,
//   DesktopOutlined,
//   MailOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   PieChartOutlined,
// } =  icons;
// const { Button, Menu } = antd;

import { Button, Menu } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sidebarData } from "./data/SidebarData";

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
      //   className="border"
      style={{
        width: "35vh",
        height: "100vh",
      }}
    >
      <Menu
        onClick={({ key }) => {
          click(key);
        }}
        defaultSelectedKeys={[location.pathname.toLowerCase()]}
        mode="inline"
        // theme="dark"
        // inlineCollapsed={true}
        items={sidebarItems}
        style={{ border: "none" }}
      />
    </div>
  );
}
