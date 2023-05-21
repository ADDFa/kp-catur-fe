import { useNavigate } from "react-router-dom"

const SidebarList = ({ to, icon, text }: SidebarListT) => {
    const navigate = useNavigate()

    const navigateTo = (evt: React.MouseEvent<HTMLLIElement>) => {
        const to = evt.currentTarget.dataset.navigate
        navigate(`${to}`)
        localStorage.setItem("sidebar_active", `${to}`)
        evt.currentTarget.parentElement
            ?.querySelector(".active")
            ?.classList.remove("active")
        evt.currentTarget.classList.add("active")
    }

    return (
        <li onClick={navigateTo} data-navigate={to}>
            {icon}
            <p className="my-auto">{text}</p>
        </li>
    )
}

export default SidebarList
