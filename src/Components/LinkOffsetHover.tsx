import { memo } from "react"
import { Link } from "react-router-dom"

const LinkOffsetHover: React.FC<LinkOffesetHoverT> = ({
    children,
    to,
    active = false,
    ...rest
}) => {
    return (
        <Link
            className={`${
                active ? "" : "link-underline-opacity-0"
            } link-offset-2 link-offset-3-hover text-dark link-underline-dark link-underline-opacity-75-hover`}
            to={to}
            {...rest}
        >
            {children}
        </Link>
    )
}

export default memo(LinkOffsetHover)
