import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/");

  const [pathItems, setPathItems] = useState([]);

  useEffect(() => {
    let arr = [];

    for (let i = 0; i < pathnames.length; i++) {
      const element = pathnames[i];

      let obj = {};

      if (element === "") {
        obj.path = "/dashboard";
        obj.title = "Home";
      } else {
        obj.path = `/${element}`;
        obj.title = element;
      }

      arr.push(obj);
    }

    setPathItems(arr);
  }, [pathnames]);

  function itemRender(currentRoute, params, pathItems, paths) {
    const isLast = currentRoute?.path === pathItems[pathItems.length - 1]?.path;

    return (
      <>
        <div style={{ color: "gray", textDecoration: "none" }}>
          {isLast ? (
            <span>{currentRoute.title}</span>
          ) : (
            <Link to={`/${paths.join("/")}`} style={{ textDecoration: "none" }}>
              {currentRoute.title}
            </Link>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ height: "3vh" }}>
        {pathnames[0] === "dashboard" || pathnames[1] === "dashboard" ? (
          <></>
        ) : (
          <Breadcrumb separator=">" itemRender={itemRender} items={pathItems} />
        )}
      </div>
    </>
  );
}
