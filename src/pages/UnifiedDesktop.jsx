import React, { Fragment, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import federationData from "../components/data/FederationData";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function UnifiedDesktop() {
  const [ loading , setLoading ] = useState(true);

  const routeDashboard = () => {
      route_to("/Dashboard")
  };

  const route_to = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    },275)
  });
  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

  return (
  <Fragment>
    { loading === true ? (
      <Loader />
    ) : (
    <Box
      data-testid="unified-desktop"
      sx={{
        display: "flex",
        alignItems: "left",
        justifyContent: "left",
        flexDirection: "row",
        gap: "2rem",
        padding: "1rem 0.5rem 1rem 0.5rem",
      }}
    >
      {federationData.map((app, index) => (
        <Box
          className="card"
          key={index}
          // href={app.url}
          onClick={routeDashboard}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 1)",
            width: "19rem",
            height: "8.8rem",
            boxShadow: "rgba(0, 0, 0, 0.08)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0rem 2rem 0rem 1.25rem",
            gap: "1.5rem",
            border: "none",
          }}
        >
          <Typography
            component="span"
            sx={{
              flex: 1,
              color: "rgba(0, 0, 0, 1)",
              fontWeight: 500,
              fontSize: "1.75rem",
            }}
          >
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
