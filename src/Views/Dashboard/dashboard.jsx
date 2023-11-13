import React from "react";
import Style from './dashboard.module.css'
import DashBoardNav from "./dashboardnav/dashboardNav";

export default function DashBoard() {
    return (
        <main className={Style.dashboard}>
            <DashBoardNav/>
        </main>
    )
}