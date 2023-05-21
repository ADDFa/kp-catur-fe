const Input = ({ label, input, text }: InputT) => {
    const removeInvalid = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const inputClass = evt.currentTarget.classList
        if (inputClass.contains("is-invalid")) inputClass.remove("is-invalid")
    }

    return (
        <div className="mb-3">
            <label htmlFor={input.id} className="form-label">
                {label}
            </label>
            <input
                {...input}
                className="form-control"
                aria-describedby={`${input.id}Help`}
                onChange={removeInvalid}
            />
            {text && (
                <div id={`${input.id}Help`} className="form-text">
                    {text}
                </div>
            )}
            <p
                id={`${input.id}Feedback`}
                className="invalid-feedback d-none"
            ></p>
        </div>
    )
}

export default Input
