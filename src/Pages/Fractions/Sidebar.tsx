import { useEffect } from "react"
import SidebarList from "../Components/SidebarList"
import { el } from "../../Functions/GetElement"
import usePayload from "../../Hooks/usePayload"

export const setSidebarActive = (dataNavigate: string) => {
    let sidebarElement = el(`#sidebar [data-navigate="${dataNavigate}"]`)
    if (!sidebarElement) {
        const history = localStorage.getItem("sidebar_history")
        sidebarElement = el(`#sidebar [data-navigate="${history}"]`)
    } else {
        localStorage.setItem("sidebar_history", dataNavigate)
    }

    el("#sidebar .active")?.classList.remove("active")
    sidebarElement?.classList.add("active")
}

const Sidebar = () => {
    const payload = usePayload()

    useEffect(() => {
        setSidebarActive(window.location.pathname)
    }, [])

    return (
        <div id="sidebar">
            <ul>
                <SidebarList to="/dashboard" text="Dashboard">
                    <i className="bi bi-speedometer" />
                </SidebarList>
                <SidebarList to="/letter/incoming" text="Surat">
                    <i className="bi bi-file-text-fill" />
                </SidebarList>
                {payload.user.role.role === "Operator" && (
                    <SidebarList to="/user" text="Pengguna">
                        <i className="bi bi-people-fill" />
                    </SidebarList>
                )}
                <SidebarList to="/disposition" text="Disposisi">
                    <i className="bi bi-mailbox" />
                </SidebarList>
                <SidebarList to="/report" text="Laporan">
                    <i className="bi bi-file-text-fill" />
                </SidebarList>
            </ul>
            <ul>
                <SidebarList text="Setting" to="/setting">
                    <i className="bi bi-gear-fill" />
                </SidebarList>
            </ul>
        </div>
    )
}

export default Sidebar
