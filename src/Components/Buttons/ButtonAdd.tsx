import { memo } from "react"
import { Link } from "react-router-dom"

const ButtonAdd: React.FC<ButtonAddT> = ({ to, children, ...rest }) => {
    return (
        <Link to={to} className="btn btn-primary" {...rest}>
            {children}
        </Link>
    )
}

export default memo(ButtonAdd)
