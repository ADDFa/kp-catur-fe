import Input from "./Components/Input"
import { useNavigate, redirect } from "react-router-dom"
import { post } from "./Functions/Api"
import "./App.css"
import logo from "./Assets/logo.png"
import Auth from "./Functions/Auth"

export const appLoader = () => {
    return localStorage.getItem("token_access") ? redirect("/dashboard") : null
}

export const App = () => {
    const navigate = useNavigate()

    const login = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const style = evt.currentTarget.style
        style.transition = "100ms"
        style.opacity = ".7"

        const res = await post("login", evt.currentTarget)

        if (res?.ok) {
            const { token_access, token_refresh, user } = res.result.data

            Auth.token_access = token_access
            Auth.token_refresh = token_refresh
            Auth.user = user

            navigate("/dashboard")
        }

        style.opacity = "1"
    }

    return (
        <div className="col-md-4 container mt-5 p-3 shadow-lg rounded-3">
            <form onSubmit={login}>
                <div className="d-flex flex-column justify-content-center gap-1 mb-5">
                    <img
                        src={logo}
                        className="mx-auto"
                        alt="SMA 9 Kota Bengkulu"
                        width={70}
                    />
                    <h4 className="fw-bold mt-3 text-center">
                        SMAN 9 KOTA BENGKULU
                    </h4>
                </div>

                <Input
                    label="Username"
                    type="text"
                    id="username"
                    name="username"
                />
                <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                />
                <button
                    type="submit"
                    className="btn btn-primary rounded w-100 rounded-5 my-5"
                >
                    Login
                </button>
            </form>
        </div>
    )
}
