import { useNavigate } from "react-router-dom"
import logo from "../../Assets/logo.png"

const Header = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div
                        className="collapse navbar-collapse px-4"
                        id="navbarSupportedContent"
                    >
                        <div className="navbar-brand d-flex gap-4 me-auto">
                            <img src={logo} alt="Bootstrap" width="50" />
                            <p className="my-auto fw-bold">
                                SMAN 9 Kota Bengkulu
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="btn btn-outline-success px-4 rounded-5"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
