import SidebarContent from "../SidebarContent";

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

  //const {isSidebarOpen, closeSidebar} = useContext(SidebarContext);

  return (
    <>
      <aside className="fixed inset-y-0 z-50 mt-16 w-64 flex-shrink-0 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Mobile;
