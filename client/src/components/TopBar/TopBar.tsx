import SearchIcon from "@heroicons/react/outline/SearchIcon";
import {Avatar, Dropdown, TextInput} from "flowbite-react";
import {MenuIcon} from "@heroicons/react/outline";

const TopBar = () => {
    return <header className="z-40 py-4 bg-white shadow-bottom">
        <div
            className="container flex items-center justify-between h-full px-6 mx-auto text-secondary">
            <button
                className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
                onClick={() => console.log("hello")}
                aria-label="Menu"
            >
                <MenuIcon className="w-6 h-6" aria-hidden="true"/>
            </button>
            <div className="flex justify-center flex-1 lg:mr-32">
                <div className="relative w-full max-w-xl mr-6 focus-within:text-jobssy-blue">
                    <div className="absolute inset-y-0 flex items-center pl-2">
                        <SearchIcon className="w-4 h-4" aria-hidden="true"/>
                    </div>
                    <TextInput
                        placeholder="Search for projects"
                        aria-label="Search"
                    />
                </div>
            </div>
            <ul className="flex items-center flex-shrink-0 space-x-6">
                <li className="relative">
                    <Dropdown label={
                        <div className="inline-flex">
                            <Avatar
                                img="https://randomuser.me/api/portraits/men/42.jpg"
                                rounded={true}
                            />
                            <div className="grid items-center ml-5">
                                <span>Ricardo Gonzalez</span>
                            </div>
                        </div>
                    } inline={true}>
                        <Dropdown.Item>
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Blog Posts
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Earnings
                        </Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                </li>
            </ul>
        </div>
    </header>
}

export default TopBar;