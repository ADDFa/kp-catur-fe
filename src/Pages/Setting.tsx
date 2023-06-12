import { useEffect, useState } from "react"
import Input from "../Components/Input"
import { get, put } from "../Functions/Api"
import usePayload from "../Hooks/usePayload"
import Toast from "../Components/Toast"
import Auth from "../Functions/Auth"

const Setting = () => {
    const [credential, setCredential] = useState<ResponseT.DataT>()
    const {
        user: { id }
    } = usePayload()

    useEffect(() => {
        const getUser = async () => {
            const res = await get(`account/${id}`)
            if (res?.ok) setCredential(res.result.data.credential)
        }

        getUser()
    }, [id])

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const res = await put(
            `account/${credential?.username || ""}`,
            evt.currentTarget
        )
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
                    defaultValue={credential?.username}
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
