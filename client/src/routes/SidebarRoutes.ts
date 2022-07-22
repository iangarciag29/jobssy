import { iSidebarRoute } from "../types";
import {
  BriefcaseIcon,
  CubeIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/outline";

/**
 * Routes the application is going to pull to render sidebar links.
 */
const SidebarRoutes: iSidebarRoute[] = [
  {
    path: "/app/",
    display: "Home",
    enabled: true,
    icon: HomeIcon,
  },
  {
    path: "/app/listings",
    display: "Listings",
    enabled: true,
    icon: BriefcaseIcon,
  },
  {
    path: "/app/workers",
    display: "Workers",
    enabled: true,
    icon: UserGroupIcon,
  },
  {
    path: "/app/profile",
    display: "Profile",
    enabled: true,
    icon: UserIcon,
  },
  {
    path: "/app/jobs",
    display: "My jobs",
    enabled: true,
    icon: CubeIcon,
  },
];

export default SidebarRoutes;
