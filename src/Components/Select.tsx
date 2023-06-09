const Select: React.FC<SelectT> = ({
    id,
    label,
    name,
    defaultValue,
    children
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <select
                className="form-select"
                id={id}
                name={name}
                aria-label={label}
                defaultValue={defaultValue}
            >
                <option value={defaultValue}>{defaultValue}</option>
                {children}
            </select>
        </div>
    )
}

export default Select
