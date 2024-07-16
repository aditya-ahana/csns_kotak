import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";

import { Button } from "antd";

import noData from "../../static/noData.png";

import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  const nav = useNavigate();

  function createRequestNav() {
    nav("/createrequest");
  }
  return (
    <>
      <div>
        {/* heading */}
        <div className="d-flex justify-content-between align-items-end">
          <span style={{ fontWeight: "bold", fontSize: "x-large" }}>
            {t("dashboard")}
          </span>
          <Button
            type="primary"
            // danger
            className="logoColorBtn rounded"
            onClick={(e) => {
              createRequestNav();
            }}
            style={{ width: "24vh", height: "6vh" }}
          >
            <span style={{ fontWeight: "bold", fontSize: "medium" }}>
              + {t("createRequest")}
            </span>
          </Button>
        </div>
        {/* space */}
        <div className="p-2"></div>
        {/* content */}

        <div
          className="d-flex justify-content-center align-items-center bg-white rounded"
          style={{ height: "73vh" }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              createRequestNav();
            }}
          >
            <img src={noData} alt="No data found" style={{ width: "33vh" }} />
            <span style={{ color: "rgba(96, 96, 96, 1)", fontWeight: "600" }}>
              {t("noRequestInDashoard")}
            </span>
            <span style={{ color: "rgba(165, 165, 165, 1)" }}>
              Click below to create new request
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
