import { useEffect, useState } from "react"
import DateFilter from "./Components/DateFilter"
import Search from "./Components/Search"
import handleRequest from "../Functions/HandleRequest"
import TableComponentTr from "./Users/TableComponentTr"
import toCapitalize from "../Functions/ToCapitalize"
import { Link } from "react-router-dom"

const User = () => {
    const [users, setUsers] = useState<UserT[]>([])

    useEffect(() => {
        async function getUsers() {
            const res = await handleRequest("get", "user")
            setUsers(res?.result.data)
        }

        getUsers()
    }, [])

    return (
        <div className="container">
            <div className="d-flex align-items-center mb-5 fs-5 justify-content-end">
                <Link to={`/user/create`} className="btn btn-primary">
                    + Tambah Pengguna
                </Link>
            </div>
            <div className="d-flex align-items-center mb-5 justify-content-between">
                <DateFilter />
                <Search />
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
