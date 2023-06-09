import { Link } from "react-router-dom"

const ButtonDetail = ({ to }: { to: string }) => {
    return (
        <Link to={to} className="btn btn-info">
            <i className="bi bi-eye text-light" />
        </Link>
    )
}

export default ButtonDetail
