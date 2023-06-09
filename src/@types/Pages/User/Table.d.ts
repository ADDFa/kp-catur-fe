namespace User {
    interface TableComponentTr {
        id: number
        no: number
        name: string
        position: string
        getUser: () => Promise<void>
    }
}
