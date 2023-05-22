const Table = ({ letters }: Dashboard.TableT) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Jenis Surat</th>
                    <th scope="col">Nomor Surat</th>
                </tr>
            </thead>
            <tbody>
                {letters?.map((letter, i) => {
                    const { letter_type, reference_number } = letter.letter

                    return (
                        <tr key={i}>
                            <th scope="row">{++i}</th>
                            <td>{letter_type}</td>
                            <td>{reference_number}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
