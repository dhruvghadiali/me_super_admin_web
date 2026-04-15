import {
  Mail,
  Flag,
  MapPin,
  School,
  Building2,
  MapPinHouse,
  LayoutDashboard,
} from "lucide-react";
import {
  STATES,
  CITIES,
  SIGN_IN,
  SCHOOLS,
  ZIPCODES,
  DASHBOARD,
  DISTRICTS,
  AREA_NAMES,
} from "@MEUtils/pageRoutes";

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
  {
    title: "states",
    path: STATES,
    icon: Flag,
  },
  {
    title: "districts",
    path: DISTRICTS,
    icon: MapPin,
  },
  {
    title: "cities",
    path: CITIES,
    icon: Building2,
  },
  {
    title: "area names",
    path: AREA_NAMES,
    icon: MapPinHouse,
  },
  {
    title: "zipcodes",
    path: ZIPCODES,
    icon: Mail,
  },
];

export { menuItems };
