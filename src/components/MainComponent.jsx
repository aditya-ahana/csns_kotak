import React from "react";
import BreadCrumb from "./BreadCrumb";
import { Outlet } from "react-router-dom";
export default function MainComponent() {
  return (
    <>
      <div>
        <BreadCrumb />
        <Outlet />
      </div>
    </>
  );
}
