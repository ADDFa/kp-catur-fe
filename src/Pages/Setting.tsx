import Input from "../Components/Input"
import Toast from "../Components/Toast"
import { setAuth } from "../Functions/Auth"
import handleRequest from "../Functions/HandleRequest"

const Setting = () => {
    const inputs: InputT[] = [
        {
            input: {
                id: "username",
                name: "username",
                type: "text"
            },
            label: "Username"
        },
        {
            input: {
                id: "password",
                name: "password",
                type: "password"
            },
            label: "Password"
        },
        {
            input: {
                id: "old_password",
                name: "old_password",
                type: "password"
            },
            label: "Password Lama"
        }
    ]

    const login = async (form: HTMLFormElement) => {
        const res = await handleRequest("post", "login", form)
        if (!res) return false

        setAuth(res.result.data)
        return true
    }

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const form = evt.currentTarget

        const res = await handleRequest("put", "account", form)
        const isLogin = await login(form)
        if (!res && !isLogin) return

        Toast.fire({
            icon: "success",
            text: "Akun berhasil di update"
        })
    }

    return (
        <>
            <h4 className="mb-5">Pengaturan Akun</h4>

            <form onSubmit={save}>
                {inputs.map((input, i) => (
                    <Input key={i} {...input} />
                ))}
                <div className="d-flex justify-content-end mt-5">
                    <button className="btn btn-primary">Simpan</button>
                </div>
            </form>
        </>
    )
}

export default Setting
