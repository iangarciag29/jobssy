import SidebarContent from "../SidebarContent";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";

const Mobile = (): JSX.Element => {
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  const { isSidebarOpen, closeSidebar }: any = useContext(SidebarContext);

  return (
    <div className={isSidebarOpen ? "block" : "hidden"}>
      <aside className="fixed inset-y-0 z-50 mt-16 w-full flex-shrink-0 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden">
        <SidebarContent />
      </aside>
    </div>
  );
};

export default Mobile;
