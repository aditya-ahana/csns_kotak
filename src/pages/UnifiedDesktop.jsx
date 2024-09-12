import React, { Fragment, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import federationData from "../components/data/FederationData";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function UnifiedDesktop() {
  const [loading, setLoading] = useState(true);

  const routeDashboard = () => {
    route_to("/Dashboard");
  };

  const route_to = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 275);
  });

  return (
    <Fragment>
      {loading === true ? (
        <Loader />
      ) : (
        <Box data-testid="unified-desktop" className="unified-desktop">
          {federationData.map((app, index) => (
            <Box
              key={index}
              // href={app.url}
              onClick={routeDashboard}
              className="app-card"
            >
              <Typography component="span" className="app-name">
                {app.name}
              </Typography>
              <img src={app.logo} height="140rem"></img>
            </Box>
          ))}
        </Box>
      )}
    </Fragment>
  );
}

export default UnifiedDesktop;
