
import { LayoutDashboard, School } from "lucide-react";
import { DASHBOARD, SCHOOLS } from "@MEUtils/pageRoutes";

const menuItems = [
  {
    title: "dashboard",
    path: DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "schools",
    path: SCHOOLS,
    icon: School,
  },
];

export { menuItems };