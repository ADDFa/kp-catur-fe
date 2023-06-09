interface SelectT extends React.HTMLAttributes<HTMLSelectElement> {
    name: string
    id: string
    label: string
    defaultValue?: string
    children: React.ReactNode
}
