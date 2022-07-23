import SearchIcon from "@heroicons/react/outline/SearchIcon";
import { Avatar, Dropdown, TextInput } from "flowbite-react";
import { MenuIcon } from "@heroicons/react/outline";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { mapDispatchToProps, mapStateToProps } from "../../utils";
import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const TopBar = ({ auth, logout }: any) => {
  const navigate = useNavigate();

  const { toggleSidebar }: any = useContext(SidebarContext);

  return (
    <header className="z-30 bg-white py-4 shadow-md">
      <div className="container mx-auto flex h-full items-center justify-between px-6 text-secondary">
        <button
          className="focus:shadow-outline-purple mr-5 -ml-1 rounded-md p-1 focus:outline-none lg:hidden"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex flex-1 justify-center lg:mr-32">
          <div className="relative mr-6 w-full max-w-xl focus-within:text-jobssy-blue">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="h-4 w-4" aria-hidden="true" />
            </div>
            <TextInput placeholder="Search for jobs" aria-label="Search" />
          </div>
        </div>
        <ul className="flex flex-shrink-0 items-center space-x-6">
          <li className="relative">
            <Dropdown
              label={
                <div className="inline-flex">
                  <Avatar
                    img="https://randomuser.me/api/portraits/men/42.jpg"
                    rounded={true}
                  />
                  <div className="ml-2 grid items-center">
                    <span>
                      {auth.user.first_name} {auth.user.last_name}
                    </span>
                  </div>
                </div>
              }
              inline={true}
            >
              <Link to="/app/profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Item>Blog Posts</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => logout(navigate)}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
