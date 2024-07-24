import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { sidebarData } from "./data/SidebarData";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar(props) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  let currLocation = location.pathname.split("/")[1];

  const theme = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const redirectTo = (linkKey) => {
    navigate(linkKey);
  };
  return (
    <div
      onMouseEnter={() => {
        handleDrawer();
      }}
      onMouseLeave={() => {
        handleDrawer();
      }}
    >
      <Drawer variant="permanent" open={sidebarOpen}>
        <Toolbar />
        <div className="p-2"></div>
        <List>
          {sidebarData.map((sidebarElement, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={(e) => {
                redirectTo(sidebarElement.linkKey);
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 42,
                  justifyContent: sidebarOpen ? "initial" : "center",
                  px: 2,
                }}
                className="d-flex justify-content-center align-items-center mb-2 rounded"
                style={{
                  background:
                    "/" + currLocation.toLowerCase() ===
                    sidebarElement.linkKey.toLowerCase()
                      ? "#FFE5E6"
                      : "",
                  color:
                    "/" + currLocation.toLowerCase() ===
                    sidebarElement.linkKey.toLowerCase()
                      ? "#ed1c24"
                      : "gray",
                  fontWeight:
                    "/" + currLocation.toLowerCase() ===
                    sidebarElement.linkKey.toLowerCase()
                      ? "900"
                      : "",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 1 : "auto",
                    justifyContent: "center",
                    fontSize: "21px",
                    color: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  {sidebarElement.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    sidebarElement.label === "Dashboard"
                      ? t("dashboard")
                      : sidebarElement.label === "Create Request"
                        ? t("createRequest")
                        : sidebarElement.label === "View/Update Request"
                          ? t("viewUpdateRequest")
                          : sidebarElement.label
                  }
                  sx={{ opacity: sidebarOpen ? 1 : 0, fontWeight: "inherit" }}
                  className="m-0 mt-1"
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
