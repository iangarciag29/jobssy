import { lazy, Suspense, useContext, useEffect } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
import routes from "../routes";
import { iRoute } from "../types";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Generics/TopBar/TopBar";
import Footer from "../components/Generics/Footer";
import { connect } from "react-redux";
import { mapStateToProps } from "../utils";

const Error404 = lazy(() => import("./../pages/Error404"));

const Layout = ({ auth }: any): JSX.Element => {
  // @ts-ignore
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [closeSidebar, location]);

  useEffect(() => {
    if (!auth.isLoggedIn) navigate("/login");
  }, [auth, navigate]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />
      <div className="flex w-full flex-1 flex-col">
        <TopBar />
        <Wrapper>
          <Suspense fallback={<h1>[DEBUG] [Layout.tsx] LOADING...</h1>}>
            <Routes>
              {routes.map((route: iRoute, idx: number) => (
                <Route
                  key={idx}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(Layout);
