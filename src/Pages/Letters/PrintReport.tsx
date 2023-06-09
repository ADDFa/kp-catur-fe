import { useEffect } from "react"

const PrintReport = () => {
    useEffect(() => {
        window.print()
    }, [])

    return (
        <>
            <div className="container-fluid my-5">
                <h1 className="text-center fs-6 fw-bold">Surat Masuk</h1>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nomor Surat</th>
                            <th scope="col">Jenis Surat</th>
                            <th scope="col">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </>
    )
}

export default PrintReport
