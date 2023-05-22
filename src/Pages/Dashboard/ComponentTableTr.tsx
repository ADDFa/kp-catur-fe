const ComponentTableTr = ({ no, name, date }: Dashboard.ComponentTableTrT) => {
    return (
        <tr>
            <th scope="row">{no}</th>
            <td>{name}</td>
            <td>{date}</td>
        </tr>
    )
}

export default ComponentTableTr
