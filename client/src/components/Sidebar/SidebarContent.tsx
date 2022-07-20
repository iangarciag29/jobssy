import SidebarRoutes from "../../routes/SidebarRoutes";
import { BTN_SIZE, iSidebarRoute } from "../../types";
import { Link, NavLink } from "react-router-dom";
import Button from "../Generics/Button";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";

//text-gray-800 dark:text-gray-100

const SidebarContent = ({ auth }: any): JSX.Element => {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <div className="my-10 text-center">
        <Link to="/app/" className="text-3xl font-bold text-primary">
          Jobssy
        </Link>
      </div>
      <hr className="mx-10" />
      <ul className="mt-6">
        {SidebarRoutes.map(
          (route: iSidebarRoute, idx: number) =>
            route.enabled && (
              <li className="relative px-6 py-3" key={idx}>
                <NavLink
                  to={route.path}
                  className="inline-flex w-full items-center text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <route.icon className="h-5 w-5" />
                  <span className="ml-4">{route.display}</span>
                </NavLink>
              </li>
            ),
        )}
      </ul>
      <div className="my-6 text-center">
        {!auth.user.is_offerer && (
          <Button size={BTN_SIZE.MEDIUM} text="+ Request a job" />
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(SidebarContent);
