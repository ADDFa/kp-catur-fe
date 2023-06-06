const ButtonDisposition = (props: ButtonDispositionT) => {
    return (
        <button type="button" data-letter_id={props.letter_id} {...props}>
            {props.children}
        </button>
    )
}

export default ButtonDisposition
