import React from "react";

import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <div
        style={{ height: "9vh" }}
        className="headerContainer d-flex align-items-center justify-content-end"
      >
        <div className="headerContainer me-3" style={{ width: "6%" }}>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="headerUserName">
              <span style={{ fontSize: "14px" }}>Admin</span>
            </div>
            <div className="headerUserIcon">
              <span>
                <FaRegUserCircle />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
