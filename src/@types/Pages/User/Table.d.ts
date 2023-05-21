namespace User {
    interface TableComponentTr {
        id: number
        no: number
        name: string
        position: string
        setUsers: React.Dispatch<React.SetStateAction<UserT[]>>
    }
}
