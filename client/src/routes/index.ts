import {iRoute} from "../types";
import {lazy} from "react";

const Home = lazy(() => import('../pages/Home'));

/**
 * List the app is going to use to generate all routes available under /app/.
 */
const routes: iRoute[] = [
    {
        path: "/",
        component: Home
    }
]
export default routes;