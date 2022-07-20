import SidebarContent from "../SidebarContent";

const Desktop = (): JSX.Element => {
    return <aside className="z-40 flex-shrink-0 hidden w-64 overflow-y-auto bg-white lg:block">
        <SidebarContent/>
    </aside>
}

export default Desktop;