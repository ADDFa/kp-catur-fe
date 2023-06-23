import { useCallback, useEffect, useState } from "react"
import Search from "./Components/Search"
import { Link } from "react-router-dom"
import { destroy, get } from "../Functions/Api"
import SelectFloating from "../Components/SelectFloating"
import ButtonEdit from "../Components/Buttons/ButtonEdit"
import ButtonDelete from "../Components/Buttons/ButtonDelete"
import { gi } from "../Functions/GetElement"
import Toast from "../Components/Toast"

const User = () => {
    const [users, setUsers] = useState<UserT[]>([])
    const [search, setSearch] = useState<string>()
    const [take, setTake] = useState<number | string>(5)

    const getUsers = useCallback(async () => {
        let endpoint = `user?take=${take}`
        if (search) endpoint += `&search=${search}`

        const res = await get(endpoint)
        setUsers(res?.result.data)
    }, [search, take])

    useEffect(() => {
        getUsers()
    }, [getUsers])

    const serachUser = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        const search = gi("search") as HTMLInputElement
        setSearch(search.value)
    }

    const handleSearchInput: React.FormEventHandler<HTMLInputElement> = (
        evt
    ) => {
        const value = evt.currentTarget.value
        if (value) return

        setSearch("")
    }

    const changeTake: React.FormEventHandler<HTMLSelectElement> = (evt) => {
        setTake(evt.currentTarget.value)
    }

    const deleteUser = async (id: string | number) => {
        const res = await destroy(`user/${id}`)
        if (!res?.ok) return

        await getUsers()
        Toast.fire({
            icon: "success",
            text: "Berhasil menghapus pengguna"
        })
    }

    return (
        <div className="container h-100">
            <div className="d-flex align-items-center mb-5 fs-5 justify-content-end">
                <Link to={`/user/create`} className="btn btn-primary">
                    + Tambah Pengguna
                </Link>
            </div>
            <div className="d-flex align-items-center mb-5 justify-content-between">
                <SelectFloating
                    id="amount-display"
                    name="amount_display"
                    label="Tampilkan Sebanyak"
                    onInput={changeTake}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </SelectFloating>
                <Search submited={serachUser} onInput={handleSearchInput} />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Jabatan</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(({ id, name, role: { role } }, i) => (
                        <tr key={i}>
                            <th scope="col">{++i}</th>
                            <td>{name}</td>
                            <td>{role}</td>
                            <td className="d-flex gap-2 justify-content-center">
                                <ButtonEdit to={`/user/${id}/edit`} />
                                <ButtonDelete action={() => deleteUser(id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default User
