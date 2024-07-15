import React, { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainComponent from "../components/MainComponent";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useTranslation } from "react-i18next";

const primaryBG = "white";
const secondaryBG = "gray";

export default function SharedLayout() {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", maxHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{
          background: primaryBG,
          color: "inherit",
        }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>

      <Sidebar />
      <Box
        component="main"
        className="parent p-3"
        sx={{
          flexGrow: 1,
          // p: 3
        }}
      >
        <Toolbar />
        <span>{t("greeting")}</span>

        <MainComponent />
      </Box>
    </Box>
  );
}
