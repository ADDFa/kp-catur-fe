import { Link } from "react-router-dom"

const Card = ({ title, subTitle, number, href = "#", linkProps }: CardT) => {
    return (
        <div className="card col-md-3">
            <Link
                to={href}
                className="card-body text-decoration-none"
                {...linkProps}
            >
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    {subTitle}
                </h6>
                <hr className="mt-5 mb-0" />
                <p className="text-end m-0 fw-bold fs-3">{number}</p>
            </Link>
        </div>
    )
}

export default Card
