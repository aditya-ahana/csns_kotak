import { RiDashboardFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlinePostAdd } from "react-icons/md";

export const sidebarData = [
  {
    linkKey: "/Dashboard",
    icon: <RiDashboardFill />,
    label: "Dashboard",
  },
  {
    linkKey: "/CreateRequest",
    icon: <FiEdit />,
    label: "Create Request",
  },
  {
    linkKey: "/ViewUpdate",
    icon: <MdOutlinePostAdd />,
    label: "View/Update Request",
  },
];
