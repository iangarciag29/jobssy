import SidebarRoutes from "../../routes/SidebarRoutes";
import {iSidebarRoute} from "../../types";
import {Link, NavLink} from "react-router-dom";
import {PlusCircleIcon} from "@heroicons/react/outline";

//text-gray-800 dark:text-gray-100

const SidebarContent = (): JSX.Element => {
    return <div className="py-4 text-gray-500 dark:text-gray-400">
        <div className="text-center my-10">
            <Link to="/app/" className="text-3xl font-bold text-primary">
                Jobssy
            </Link>
        </div>
        <hr className="mx-10"/>
        <ul className="mt-6">
            {SidebarRoutes.map((route: iSidebarRoute, idx: number) => (
                route.enabled && <li className="relative px-6 py-3" key={idx}>
                    <NavLink to={route.path}
                             className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                        <route.icon className="w-5 h-5"/>
                        <span className="ml-4">{route.display}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
        <div className="px-6 my-6">
            <button className="inline-flex">
                Request a job
                <span className="mt-0.5" aria-hidden="true">
                    <PlusCircleIcon className="h-5 w-5"/>
                </span>
            </button>
        </div>
    </div>
}

export default SidebarContent;