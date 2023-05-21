namespace SelectT {
    type Option = {
        key: string
        value: string
    }

    interface SelectT {
        label: string
        selectAttribute?: React.SelectHTMLAttributes<HTMLSelectElement>
        options: Option[]
    }
}
