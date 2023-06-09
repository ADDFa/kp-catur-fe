const Input = ({ label, text, id, name, ...rest }: InputT) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                {...rest}
                id={id}
                name={name}
                className="form-control"
                aria-describedby={`${id}Help`}
            />
            {text && (
                <div id={`${id}Help`} className="form-text">
                    {text}
                </div>
            )}
        </div>
    )
}

export default Input
