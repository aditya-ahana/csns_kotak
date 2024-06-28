import { RiDashboardFill } from "react-icons/ri";
// import { IoCreateOutline } from "react-icons/io5";
// import { FaList } from "react-icons/fa6";

import { FiEdit } from "react-icons/fi";
import { MdOutlinePostAdd } from "react-icons/md";

export const sidebarData = [
  {
    key: "/Dashboard",
    icon: <RiDashboardFill />,
    label: "Dashboard",
  },
  {
    key: "/CreateRequest",
    icon: <FiEdit />,
    label: "Create Request",
  },
  {
    key: "/ViewUpdate",
    icon: <MdOutlinePostAdd />,
    label: "View/Update Request",
  },
];
