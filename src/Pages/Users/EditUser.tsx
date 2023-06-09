import { Link, useNavigate, useParams } from "react-router-dom"
import Input from "../../Components/Input"
import Select from "../../Components/Select"
import { useEffect, useState } from "react"
import { get, put } from "../../Functions/Api"
import Toast from "../../Components/Toast"

const EditUser = () => {
    const { id } = useParams()
    const [roles, setRoles] = useState<ResponseT.DataT[]>()
    const [users, setUsers] = useState<ResponseT.DataT>()
    const navigate = useNavigate()

    useEffect(() => {
        const getRoles = async () => {
            const res = await get("role")
            if (res?.ok) setRoles(res.result.data)
        }

        const getUser = async () => {
            const res = await get(`user/${id}`)
            if (res?.ok) setUsers(res.result.data)
        }

        getRoles()
        getUser()
    }, [])

    const save: React.FormEventHandler<HTMLFormElement> = async (evt) => {
        evt.preventDefault()

        const res = await put(`user/${id}`, evt.currentTarget)
        if (!res?.ok) return

        Toast.fire({
            icon: "success",
            text: "Berhasil mengupdate pengguna"
        })

        setTimeout(() => navigate("/user"), 600)
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
                            defaultValue={users?.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <Select
                            label="Jabatan"
                            id="role"
                            name="role"
                            defaultValue="Pilih Jabatan"
                        >
                            {roles?.map(({ role, id }, i) => (
                                <option value={id} key={i}>
                                    {role}
                                </option>
                            ))}
                        </Select>
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

export default EditUser
