import Input from "./Components/Input"
import { useNavigate, redirect } from "react-router-dom"
import "./App.css"
import { setAuth } from "./Functions/Auth"
import handleRequest from "./Functions/HandleRequest"

export const appLoader = () => {
    return localStorage.getItem("token_access") ? redirect("/dashboard") : null
}

const App = () => {
    const navigate = useNavigate()

    const inputs: InputT[] = [
        {
            label: "Username",
            input: {
                type: "text",
                id: "username",
                name: "username"
            }
        },
        {
            label: "Password",
            input: {
                type: "password",
                id: "password",
                name: "password"
            }
        }
    ]

    const login = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const style = evt.currentTarget.style
        style.transition = "100ms"
        style.opacity = ".7"

        const res = await handleRequest("post", "login", evt.currentTarget)
        if (res) {
            setAuth(res.result.data)
            navigate("/dashboard")
        }

        style.opacity = "1"
    }

    return (
        <div className="col-md-4 container mt-5 p-3 shadow-lg rounded-3">
            <form onSubmit={login}>
                <h4 className="fw-bold mt-3 mb-5 text-center">
                    SMAN 9 Kota Bengkulu
                </h4>
                {inputs.map((input, i) => (
                    <Input key={i} {...input} />
                ))}
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

export default App
