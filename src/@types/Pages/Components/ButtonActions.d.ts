namespace ButtonActionsT {
    type ButtonT = "show" | "edit" | "delete"

    interface ButtonsT {
        button: ButtonT
        action?: () => void
    }
}
