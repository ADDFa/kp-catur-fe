import { useCallback, useEffect, useState } from "react"
import Search from "./Components/Search"
import TableComponentTr from "./Users/TableComponentTr"
import toCapitalize from "../Functions/ToCapitalize"
import { Link } from "react-router-dom"

const User = () => {
    const [users, setUsers] = useState<UserT[]>([])
    const [name, setName] = useState<string>()
    const [take, setTake] = useState<number | string>(5)

    const getUsers = useCallback(async () => {
        let endpoint = `user?take=${take}`
        if (name) endpoint += `&name=${name}`

        // const res = await handleRequest("get", endpoint)
        // setUsers(res?.result.data)
    }, [name, take])

    useEffect(() => {
        getUsers()
    }, [getUsers])

    const serachUser = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        setName(evt.currentTarget.querySelector("input")?.value)
        getUsers()
    }

    const takeLimit = (evt: React.FormEvent<HTMLSelectElement>) => {
        evt.preventDefault()
        setTake(evt.currentTarget.value)
        getUsers()
    }

    return (
        <div className="container h-100">
            <div className="d-flex align-items-center mb-5 fs-5 justify-content-end">
                <Link to={`/user/create`} className="btn btn-primary">
                    + Tambah Pengguna
                </Link>
            </div>
            <div className="d-flex align-items-center mb-5 justify-content-between">
                <Search submited={serachUser} />
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
                    {users.map((user, i) => (
                        <TableComponentTr
                            key={i}
                            id={user.id}
                            name={user.name}
                            no={++i}
                            position={toCapitalize(user.position.role)}
                            setUsers={setUsers}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default User
