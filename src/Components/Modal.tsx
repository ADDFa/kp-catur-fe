const Modal: React.FC<ModalT> = ({
    children,
    id,
    buttonText,
    buttonProps,
    title,
    confirmButtonText,
    cancelButtonText,
    onConfirmed,
    buttonColor
}) => {
    return (
        <>
            <button
                type="button"
                className={`btn btn-${buttonColor || "primary"}`}
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
                {...buttonProps}
            >
                {buttonText}
            </button>

            <div
                className="modal fade"
                id={id}
                tabIndex={-1}
                aria-labelledby={`${id}Label`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${id}Label`}>
                                {title}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">{children}</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                {confirmButtonText || "Batal"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onConfirmed}
                            >
                                {cancelButtonText || "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
