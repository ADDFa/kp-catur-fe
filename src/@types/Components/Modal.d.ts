type ButtonColorT = "warning" | "secondary" | "success"

interface ModalT {
    id: string
    children: React.ReactNode
    buttonText: string | React.ReactNode
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
    buttonColor?: ButtonColorT
    title: string | React.ReactNode
    confirmButtonText?: string
    cancelButtonText?: string
    onConfirmed: React.MouseEventHandler<HTMLButtonElement>
}
