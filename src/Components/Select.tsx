const Select = ({ selectAttribute, options, label }: SelectT.SelectT) => {
    return (
        <div className="mb-3">
            <label htmlFor={selectAttribute?.id} className="form-label">
                {label}
            </label>
            <select
                className="form-control"
                aria-label="Default select example"
                {...selectAttribute}
            >
                {options.map((option, i) => (
                    <option key={i} value={option.key}>
                        {option.value}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select
