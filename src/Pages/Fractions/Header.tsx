import { useNavigate } from "react-router-dom"

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
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <div className="navbar-brand d-flex gap-4 me-auto">
                            <img
                                src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
                                alt="Bootstrap"
                                width="46"
                                height="40"
                            />
                            <p className="my-auto">SMAN 9 Kota Bengkulu</p>
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
