import { memo } from "react"

const SelectFloating: React.FC<SelectT> = ({
    id,
    name,
    children,
    label,
    ...rest
}) => {
    return (
        <div className="form-floating col-md-4">
            <select
                className="form-select"
                id={id}
                name={name}
                aria-label={label}
                {...rest}
            >
                {children}
            </select>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default memo(SelectFloating)
