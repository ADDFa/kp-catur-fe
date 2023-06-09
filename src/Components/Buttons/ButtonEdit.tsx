import { Link } from "react-router-dom"

const ButtonEdit = ({ to }: { to: string }) => {
    return (
        <Link to={to} className="btn btn-warning">
            <i className="bi bi-pencil text-light" />
        </Link>
    )
}

export default ButtonEdit
