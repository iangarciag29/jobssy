import {iRoute} from "../types";
import {lazy} from "react";

const Home = lazy(() => import('../pages/Home'));

const routes: iRoute[] = [
    {
        path: "/",
        component: Home
    }
]
export default routes;