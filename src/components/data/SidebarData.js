import { RiDashboardFill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";

export const sidebarData = [
  {
    key: "/Dashboard",
    icon: <RiDashboardFill />,
    label: "Dashboard",
  },
  {
    key: "/CreateRequest",
    icon: <IoCreateOutline />,
    label: "Create Request",
  },
  {
    key: "/ViewUpdate",
    icon: <FaList />,
    label: "View/Update Request",
  },
];
