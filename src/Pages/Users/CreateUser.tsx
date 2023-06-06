import { Link, useNavigate } from "react-router-dom"
import Input from "../../Components/Input"
import Select from "../../Components/Select"
import Toast from "../../Components/Toast"

const CreateUser = () => {
    const navigate = useNavigate()

    const roleOptions: SelectT.Option[] = [
        {
            key: "staff",
            value: "Staff"
        },
        {
            key: "kepsek",
            value: "Kepala Sekolah"
        },
        {
            key: "wakil_kepsek",
            value: "Wakil Kepala Sekolah"
        }
    ]

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        // const res = await handleRequest("post", "user", evt.currentTarget)
        // if (!res) return

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
                <Input
                    label="Nama Pengguna"
                    inputAttribute={{
                        id: "name",
                        name: "name",
                        placeholder: "Pengguna",
                        type: "text"
                    }}
                />
                <Input
                    label="Username"
                    inputAttribute={{
                        id: "username",
                        name: "username",
                        placeholder: "admin sma 9",
                        type: "text"
                    }}
                />

                <Select
                    label="Jabatan"
                    selectAttribute={{
                        id: "role",
                        name: "role"
                    }}
                    options={roleOptions}
                />

                <div className="d-flex justify-content-end gap-2 mt-5">
                    <button className="btn btn-primary">Simpan</button>
                    <Link className="btn btn-warning" to={`/user`}>
                        Kembali
                    </Link>
                </div>
            </form>
        </>
    )
}

export default CreateUser
