import {lazy, Suspense, useContext, useEffect} from "react";
import {SidebarContext} from "../context/SidebarContext";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Wrapper from "./Wrapper";
import routes from "../routes";
import {iRoute} from "../types";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar/TopBar";
import Footer from "../components/Footer";

const Error404 = lazy(() => import("./../pages/Error404"))

const Layout = (): JSX.Element => {

    // @ts-ignore
    const {isSidebarOpen, closeSidebar} = useContext(SidebarContext);
    let location = useLocation();

    useEffect(() => {
        closeSidebar();
    }, [closeSidebar, location]);

    return <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
        <Sidebar/>
        <div className="flex flex-col flex-1 w-full">
            <TopBar/>
            <Wrapper>
                <Suspense fallback={<h1>[DEBUG] [Layout.tsx] LOADING...</h1>}>
                    <Routes>
                        {routes.map((route: iRoute, idx: number) =>
                            <Route
                                key={idx}
                                path={route.path}
                                element={<route.component/>}
                            />)}
                        <Route path="/" element={<Navigate to="/app/home"/>}/>
                        <Route path="*" element={<Error404/>}/>
                    </Routes>
                </Suspense>
            </Wrapper>
            <Footer/>
        </div>
    </div>
}

export default Layout;