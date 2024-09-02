import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import noData from "../../static/noData.png";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { RiAddLargeFill } from "react-icons/ri";
import Loader from "../../components/Loader";

export default function Dashboard() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 285);
  });

  const nav = useNavigate();

  function createRequestNav() {
    nav("/createrequest");
  }

  return (
    <>
      <div data-testid="dashboard-main">
        {/* heading */}
        <div className="d-flex justify-content-between align-items-end">
          <Typography component="span" fontWeight={500} fontSize="1.36rem">
            {t("dashboard")}
          </Typography>
          {/* <span style={{ fontWeight: "bold", fontSize: "x-large" }}>
         
          </span> */}
          <Button
            type="primary"
            // danger
            className="logoColorBtn rounded"
            onClick={(e) => {
              createRequestNav();
            }}
            style={{
              // width: "24vh",
              height: "6vh",
              fontWeight: "bold",
              fontSize: "medium",
            }}
          >
            {/* <span style={{ fontWeight: "bold", fontSize: "medium" }}>
              <span col> */}
            <RiAddLargeFill />
            {t("createRequest")}
            {/* </span> */}
            {/* </span> */}
          </Button>
        </div>
        {/* space */}
        <div className="p-2"></div>
        {/* content */}
        <div
          className="d-flex justify-content-center align-items-center bg-white rounded"
          style={{ height: "73vh" }}
        >
          { loading === true ? (
        <Loader />
      ) : ( 
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ cursor: "pointer" }}
            data-testid="create-request-button"
            onClick={(e) => {
              createRequestNav();
            }}
          >
            <img src={noData} alt="No data found" style={{ width: "33vh" }} />
            <span style={{ color: "rgba(96, 96, 96, 1)", fontWeight: "600" }}>
              {t("noRequestInDashoard")}
            </span>
          </div>
          )}
        </div>
      </div>
    </>
  );
}

//////Rejected///////

/////// 1.import noData (says unexpected import or token)
