namespace Letter {
    interface ActionT {
        color: string
        children?: React.ReactNode
        action: (evt: React.MouseEvent<HTMLButtonElement>) => any
    }
}
