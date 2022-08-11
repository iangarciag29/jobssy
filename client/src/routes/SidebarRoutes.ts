import { iSidebarRoute } from "../types";
import {
  ArchiveIcon,
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
    className: "hidden lg:block",
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
  {
    path: "/app/categories",
    display: "Job categories",
    enabled: true,
    icon: ArchiveIcon,
  },
];

export default SidebarRoutes;
