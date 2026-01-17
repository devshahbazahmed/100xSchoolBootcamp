import { useEffect, useState } from "react";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import { useMediaQuery } from "./hooks/useMediaQuery";

function ProfileApp() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (isDesktop == false) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [isDesktop]);
    return (
        <div className="flex">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <MainContent sidebarOpen={sidebarOpen} />
        </div>
    );
}



export default ProfileApp;