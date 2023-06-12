const Li: React.FC<LiT> = ({ children, label, text }) => {
    return (
        <li className="list-group-item p-0 mb-5">
            <h5 className="fs-6">{label}</h5>
            <p>{text}</p>
            {children}
        </li>
    )
}

export default Li
