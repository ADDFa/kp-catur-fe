import { Link, useNavigate } from "react-router-dom"
import Input from "../../Components/Input"
// import Select from "../../Components/Select"
import Toast from "../../Components/Toast"
import { useEffect, useState } from "react"
import { get, post } from "../../Functions/Api"
import Select from "../../Components/Select"

const CreateUser = () => {
    const navigate = useNavigate()
    const [roles, setRoles] = useState<ResponseT.DataT[]>()

    useEffect(() => {
        const getRoles = async () => {
            const res = await get("role")
            if (res?.ok) setRoles(res.result.data)
        }

        getRoles()
    }, [])

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const res = await post("user", evt.currentTarget)
        console.log(res)
        if (!res?.ok) return

        Toast.fire({
            icon: "success",
            text: "Berhasil menambahkan pengguna."
        })
        navigate("/user")
    }

    return (
        <>
            <h3 className="mb-5">Tambah Data Pengguna</h3>

            <form onSubmit={save}>
                <div className="row">
                    <div className="col-md-6">
                        <Input
                            label="Nama Pengguna"
                            id="name"
                            name="name"
                            placeholder="Pengguna"
                            type="text"
                        />
                        <Input
                            label="Username"
                            id="username"
                            name="username"
                            placeholder="admin sma 9"
                            type="text"
                        />
                    </div>
                    <div className="col-md-6">
                        <Select
                            label="Jabatan"
                            id="role"
                            name="role"
                            defaultValue="Pilih Jabatan"
                        >
                            {roles?.map(({ role, id }, i) => {
                                return role !== "Operator" ? (
                                    <option value={id} key={i}>
                                        {role}
                                    </option>
                                ) : (
                                    ""
                                )
                            })}
                        </Select>
                        <Input
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                        />
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-5">
                        <button className="btn btn-primary">Simpan</button>
                        <Link className="btn btn-warning" to={`/user`}>
                            Kembali
                        </Link>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateUser
