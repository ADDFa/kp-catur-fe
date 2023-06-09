const Table: React.FC<Dashboard.TableT> = ({ children }) => {
    return (
        <div className="col-md-6">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Jenis Surat</th>
                        <th scope="col">Nomor Surat</th>
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    )
}

export default Table
