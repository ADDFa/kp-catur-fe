import { LoaderFunctionArgs, Outlet, redirect } from "react-router-dom"
import Header from "./Fractions/Header"
import Sidebar, { setSidebarActive } from "./Fractions/Sidebar"
import { BASE_URL } from "../router"
import { useEffect } from "react"
import { el } from "../Functions/GetElement"

export const rootLoader = (args: LoaderFunctionArgs) => {
    document.addEventListener("click", () => {
        setSidebarActive(window.location.pathname)
    })

    if (BASE_URL === args.request.url) return redirect("/dashboard")
    return localStorage.getItem("token_access") ? null : redirect("/login")
}

const Root = () => {
    useEffect(() => {
        const body = el("body") as HTMLBodyElement
        body.style.backgroundColor = "#fff"
    }, [])

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
