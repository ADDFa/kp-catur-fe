import Input from "../Components/Input"
import { put } from "../Functions/Api"
import usePayload from "../Hooks/usePayload"
import Toast from "../Components/Toast"
import Auth from "../Functions/Auth"

const Setting = () => {
    const {
        user: { id }
    } = usePayload()

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const res = await put(`account/${id}`, evt.currentTarget)
        if (!res?.ok) return

        const { token_access, token_refresh } = res.result.data
        Auth.token_access = token_access
        Auth.token_refresh = token_refresh

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
                    id="username"
                    name="username"
                    type="text"
                />
                <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                />
                <Input
                    label="Password Lama"
                    id="old_password"
                    name="old_password"
                    type="password"
                />

                <div className="d-flex justify-content-end mt-5">
                    <button className="btn btn-primary">Simpan</button>
                </div>
            </form>
        </>
    )
}

export default Setting
