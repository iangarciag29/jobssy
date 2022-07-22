import { iRoute } from "../types";
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/users/Profile"));
const Listings = lazy(() => import("../pages/users/Listings"));
const Workers = lazy(() => import("../pages/offerers/OffererList"));
const Worker = lazy(() => import("../pages/offerers/Worker"));
const Jobs = lazy(() => import("../pages/jobs/index"));

/**
 * List the app is going to use to generate all routes available under /app/.
 */
const routes: iRoute[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/listings",
    component: Listings,
  },
  {
    path: "/workers",
    component: Workers,
  },
  {
    path: "/workers/:id",
    component: Worker,
  },
  {
    path: "/jobs",
    component: Jobs,
  },
];
export default routes;
