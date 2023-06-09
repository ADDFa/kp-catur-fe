import ConfirmDialog from "../ConfirmDialog"

const ButtonDelete: React.FC<ButtonDeleteT> = ({ action }) => {
    const handleDelete = () => {
        ConfirmDialog(action, {
            text: "Hapus Data?"
        })
    }

    return (
        <button className="btn btn-danger" onClick={handleDelete}>
            <i className="bi bi-trash3" />
        </button>
    )
}

export default ButtonDelete
