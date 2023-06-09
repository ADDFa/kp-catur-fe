interface ModalT {
    id: string
    children: React.ReactNode
    buttonText: string | React.ReactNode
    buttonColor?: "warning"
    title: string | React.ReactNode
    confirmButtonText?: string
    cancelButtonText?: string
    onConfirmed: React.MouseEventHandler<HTMLButtonElement>
}
