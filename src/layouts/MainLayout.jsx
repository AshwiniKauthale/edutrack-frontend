import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] =
        useState(false);


    const toggleSidebar = () => {

        setSidebarOpen(
            previous => !previous
        );

    };


    const closeSidebar = () => {

        setSidebarOpen(false);

    };


    return (

        <div className="app-container">

            {/* ================= NAVBAR ================= */}

            <Navbar
                onMenuClick={toggleSidebar}
            />


            {/* ================= SIDEBAR ================= */}

            <Sidebar
                open={sidebarOpen}
                onClose={closeSidebar}
            />


            {/* ================= MAIN CONTENT ================= */}

            <main className="main-content">

                <div className="page-content">

                    {children}

                </div>

            </main>

        </div>

    );
}