import SidebarContent from "../SidebarContent";

const Desktop = (): JSX.Element => {
  return (
    <aside className="z-40 hidden w-64 flex-shrink-0 overflow-y-auto bg-primary text-gray-50 lg:block">
      <SidebarContent />
    </aside>
  );
};

export default Desktop;
