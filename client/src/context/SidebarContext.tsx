import {createContext, useMemo, useState} from "react";

// @ts-ignore
export const SidebarContext = createContext();

export const SidebarProvider = ({children}: any) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = (): void => {
        setIsSidebarOpen(true);
    }

    const closeSidebar = (): void => {
        setIsSidebarOpen(false);
    }

    const value = useMemo(
        () => ({
            isSidebarOpen,
            toggleSidebar,
            closeSidebar,
        }), [isSidebarOpen]
    )

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}