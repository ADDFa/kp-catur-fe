const ButtonAction = ({ color, children, action }: Letter.ActionT) => {
    return (
        <button className={`btn btn-${color}`} onClick={action}>
            {children}
        </button>
    )
}

export default ButtonAction
