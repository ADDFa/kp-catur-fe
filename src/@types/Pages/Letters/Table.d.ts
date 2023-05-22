namespace Letter {
    interface TableT {
        letterType: "in" | "out"
        children?: React.ReactNode
    }

    interface TableComponentTr {
        id: number
        no: number
        setLetters: React.Dispatch<React.SetStateAction>
        letterNumber: string
        letterType: string
        type: "incoming" | "outgoing"
        date: string
        sender?: string
        destination?: string
    }
}
