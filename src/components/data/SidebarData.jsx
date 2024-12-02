import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlinePostAdd } from "react-icons/md";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const sidebarData = [
  {
    linkKey: "/",
    // linkKey: "/Dashboard",
    icon: <RiDashboardFill />,
    label: "Dashboard",
  },
  {
    linkKey: "/CreateRequest",
    icon: <MdOutlinePostAdd />,
    label: "Create Request",
  },
  {
    linkKey: "/ViewRequest",
    icon: <FiEdit />,
    label: "View/Update Request",
  },
  {
    linkKey: "/UserManagement",
    icon: <ManageAccountsIcon />,
    label: "User Management",
  },
];
