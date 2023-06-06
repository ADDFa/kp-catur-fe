const Input = ({ label, inputAttribute, text }: InputT) => {
    const removeInvalid = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const inputClass = evt.currentTarget.classList
        if (inputClass.contains("is-invalid")) inputClass.remove("is-invalid")
    }

    return (
        <div className="mb-3">
            <label htmlFor={inputAttribute.id} className="form-label">
                {label}
            </label>
            <input
                {...inputAttribute}
                className="form-control"
                aria-describedby={`${inputAttribute.id}Help`}
                onChange={removeInvalid}
            />
            {text && (
                <div id={`${inputAttribute.id}Help`} className="form-text">
                    {text}
                </div>
            )}
            <p
                id={`${inputAttribute.id}Feedback`}
                className="invalid-feedback d-none"
            ></p>
        </div>
    )
}

export default Input
