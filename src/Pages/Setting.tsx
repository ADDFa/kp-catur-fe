import Input from "../Components/Input"
import Toast from "../Components/Toast"
import { setAuth } from "../Functions/Auth"

const Setting = () => {
    const login = async (form: HTMLFormElement) => {
        // const res = await handleRequest("post", "login", form)
        // if (!res) return false

        // setAuth(res.result.data)
        return true
    }

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const form = evt.currentTarget

        // const res = await handleRequest("put", "account", form)
        // const isLogin = await login(form)
        // if (!res && !isLogin) return

        Toast.fire({
            icon: "success",
            text: "Akun berhasil di update"
        })
    }

    return (
        <>
            <h4 className="mb-5">Pengaturan Akun</h4>

            <form onSubmit={save}>
                <Input
                    label="Username"
                    inputAttribute={{
                        id: "username",
                        name: "username",
                        type: "text"
                    }}
                />
                <Input
                    label="Password"
                    inputAttribute={{
                        id: "password",
                        name: "password",
                        type: "password"
                    }}
                />
                <Input
                    label="Password Lama"
                    inputAttribute={{
                        id: "old_password",
                        name: "old_password",
                        type: "password"
                    }}
                />

                <div className="d-flex justify-content-end mt-5">
                    <button className="btn btn-primary">Simpan</button>
                </div>
            </form>
        </>
    )
}

export default Setting
