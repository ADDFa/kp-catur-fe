import Input from "./Components/Input"
import { useNavigate, redirect } from "react-router-dom"
import { setAuth } from "./Functions/Auth"
import "./App.css"
import { post } from "./Functions/Api"

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
        if (!res) return (style.opacity = "1")

        setAuth(res.result.data)
        navigate("/dashboard")
    }

    return (
        <div className="col-md-4 container mt-5 p-3 shadow-lg rounded-3">
            <form onSubmit={login}>
                <h4 className="fw-bold mt-3 mb-5 text-center">
                    SMAN 9 Kota Bengkulu
                </h4>
                <Input
                    label="Username"
                    inputAttribute={{
                        type: "text",
                        id: "username",
                        name: "username"
                    }}
                />
                <Input
                    label="Password"
                    inputAttribute={{
                        type: "password",
                        id: "password",
                        name: "password"
                    }}
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
