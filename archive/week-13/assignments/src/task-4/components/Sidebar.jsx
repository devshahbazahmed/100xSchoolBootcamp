import PropTypes from "prop-types";
import { ToggleBar } from "./icons/ToggleBar";
import { Home } from "./icons/Home";
import { UserGroup } from "./icons/UserGroup";
import { CreditCard } from "./icons/CreditCard";
import { Document } from "./icons/Document";
import { Settings } from "./icons/Settings";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const sidebarIcons = [
        {
            id: 1,
            title: "Home",
            icon: <Home />
        }, {
            id: 2,
            title: "Webinars",
            icon: <UserGroup />
        }, {
            id: 3,
            title: "Billing",
            icon: <CreditCard />
        }, {
            id: 4,
            title: "User Management",
            icon: <Document />
        }, {
            id: 5,
            title: "Settings",
            icon: <Settings />
        }
    ];

    if (!sidebarOpen) {
        return (
            <div className="fixed top-0 left-0">
                <div className="cursor-pointer hover:bg-slate-200" onClick={() => {
                    setSidebarOpen(!sidebarOpen);
                }}>
                    <ToggleBar />
                </div>
            </div>
        );
    }

    return (
        <div className="w-96 h-screen bg-white fixed top-0 left-0 md:relative transition-all ease-in-out duration-150">
            <div>
                <div className="cursor-pointer hover:bg-slate-200" onClick={() => {
                    setSidebarOpen(!sidebarOpen);
                }}>
                    <ToggleBar />

                </div>
                <div className="flex-col">
                    {sidebarIcons.map(item => (
                        <div className="flex justify-between p-4 hover:cursor-pointer hover:bg-slate-300 hover:rounded-lg hover:mx-1" key={item.id}>
                            {item.title} {item.icon}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

Sidebar.propTypes = {
    sidebarOpen: PropTypes.bool,
    setSidebarOpen: PropTypes.func,
};