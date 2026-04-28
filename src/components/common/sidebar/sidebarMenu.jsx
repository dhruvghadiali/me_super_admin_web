import {
  Mail,
  Flag,
  MapPin,
  School,
  Building2,
  MapPinHouse,
  LayoutDashboard,
  Building2Icon,
  HotelIcon,
  FileBadgeIcon,
  IndianRupee,
  GraduationCapIcon,
  PresentationIcon
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
  FACILITY_TYPES,
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
    title: "facility types",
    path: FACILITY_TYPES,
    icon: HotelIcon,
  },
  {
    title: "facilities",
    path: STATES,
    icon: Building2Icon,
  },
  {
    title: "admission documents",
    path: STATES,
    icon: FileBadgeIcon,
  },
  {
    title: "fee types",
    path: STATES,
    icon: IndianRupee,
  },
  {
    title: "academic classes",
    path: STATES,
    icon: PresentationIcon,
  },
  {
    title: "eduction boards",
    path: STATES,
    icon: GraduationCapIcon,
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
