
import { Outlet } from "react-router";
import Sidebar from "./SideBar";
import "./AppLayout.scss";

/**
 * @description Provides the shared sidebar and content layout
 * for authenticated application pages.
 */
const AppLayout = () => {
    return (
        <div className="app-layout">
            <Sidebar />

            <main className="app-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
