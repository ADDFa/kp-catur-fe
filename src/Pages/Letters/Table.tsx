const Table = ({ letterType, children }: Letter.TableT) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nomor Surat</th>
                    <th scope="col">Jenis Surat</th>
                    <th scope="col">
                        {letterType === "in" ? "Pengirim" : "Tujuan"}
                    </th>
                    <th className="text-center">Aksi</th>
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    )
}

export default Table
