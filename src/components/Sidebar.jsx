// import React, { useEffect, useState } from "react";
// import { Button, Menu } from "antd";
// import { useNavigate, useLocation } from "react-router-dom";
// import { sidebarData } from "./data/SidebarData";

// import logo from "../static/logo.png";
// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [sidebarItems, setSidebarItems] = useState([]);

//   useEffect(() => {
//     let arr = [];
//     for (let i = 0; i < sidebarData.length; i++) {
//       const element = sidebarData[i];

//       element.key = element.key.toLowerCase();
//       arr.push(element);
//     }

//     setSidebarItems(arr);
//   }, []);

//   const click = (key) => {
//     navigate(key);
//   };

//   return (
//     <div
//       // className="border"
//       // className="d-flex flex-col"
//       style={{ height: "100%" }}
//     >
//       <div
//         className="sidenavLogoContainer d-flex align-items-center justify-content-start"
//         style={{ height: "9vh" }}
//       >
//         <img
//           src={logo}
//           alt="Kotak Logo"
//           style={{ width: "15vh", marginLeft: "9%" }}
//         />
//       </div>

//       <div className="p-3"></div>
//       <div className="p-1">
//         <Menu
//           onClick={({ key }) => {
//             click(key);
//           }}
//           defaultSelectedKeys={[location.pathname.toLowerCase()]}
//           // mode="inline"
//           // theme="dark"
//           // inlineCollapsed={true}
//           items={sidebarItems}
//           style={{
//             border: "none",
//             //  height: "80vh", padding: "6%"
//           }}
//         />
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { sidebarData } from "./data/SidebarData";

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

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

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
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("location", "/" + location.pathname.split("/")[1]);
  const redirectTo = (linkKey) => {
    navigate(linkKey);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const handleDrawerClose = () => {
    props.setSidebarOpen(props.sidebarOpen);
  };

  return (
    <>
      <div>
        <div className="p-2"></div>
        <Box>
          <Drawer variant="permanent" open={props.sidebarOpen}>
            <List>
              {sidebarData.map((dataObj, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  style={{
                    display: "block",
                    color:
                      dataObj.linkKey.toLowerCase() ===
                      "/" + location.pathname.split("/")[1].toLowerCase()
                        ? "#ed1c24"
                        : "gray",

                    fontWeight:
                      dataObj.linkKey.toLowerCase() ===
                      "/" + location.pathname.split("/")[1].toLowerCase()
                        ? "700"
                        : "inherit",
                    background:
                      dataObj.linkKey.toLowerCase() ===
                      "/" + location.pathname.split("/")[1].toLowerCase()
                        ? "#FFE5E6"
                        : "none",

                    borderRadius: "5px",
                  }}
                  className="mb-2"
                  onClick={(e) => {
                    redirectTo(dataObj.linkKey);
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: props.sidebarOpen ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: props.sidebarOpen ? 3 : "auto",
                        justifyContent: "center",
                        color:
                          dataObj.linkKey.toLowerCase() ===
                          "/" + location.pathname.split("/")[1].toLowerCase()
                            ? "#ed1c24"
                            : "gray",
                        fontSize: "21px",
                      }}
                    >
                      {dataObj.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={dataObj.label}
                      sx={{ opacity: props.sidebarOpen ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
      </div>
    </>
  );
}
