import {iSidebarRoute} from "../types";
import {HomeIcon} from "@heroicons/react/outline";

const SidebarRoutes: iSidebarRoute[] = [
    {
        path: "/app/",
        display: "Home",
        enabled: true,
        icon: HomeIcon
    },
];

export default SidebarRoutes;