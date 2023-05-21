import { Outlet, redirect } from "react-router-dom"
import Header from "./Fractions/Header"
import Sidebar from "./Fractions/Sidebar"

export const rootLoader = () => {
    return localStorage.getItem("token_access") ? null : redirect("/login")
}

const Root = () => {
    return (
        <>
            <Header />
            <div id="content">
                <Sidebar />
                <div id="outlet">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Root
