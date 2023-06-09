import { useEffect, useState } from "react"
import { get } from "../Functions/Api"
import { Link } from "react-router-dom"

const Report = () => {
    const [incomingLetters, setIncomingLetters] = useState<ResponseT.DataT[]>()
    const [outgoingLetters, setOutgoingLetters] = useState<ResponseT.DataT[]>()

    useEffect(() => {
        const getLetters = async () => {
            const incomingLetters = await get("letter/incoming")
            const outgoingLetters = await get("letter/outgoing")

            if (incomingLetters?.ok) {
                setIncomingLetters(incomingLetters.result.data)
            }
            if (outgoingLetters?.ok) {
                setOutgoingLetters(outgoingLetters.result.data)
            }
        }

        getLetters()
    }, [])

    return (
        <div className="row">
            <div className="col-md-12 my-5 d-flex justify-content-end">
                <Link
                    to="/report/print"
                    target="_blank"
                    className="btn btn-primary"
                >
                    <i className="bi bi-printer me-2" /> Cetak Laporan
                </Link>
            </div>

            <div className="col-md-6">
                <h3 className="mb-5">Surat Masuk</h3>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Jenis Surat</th>
                            <th scope="col">Nomor Surat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomingLetters?.map(
                            ({ letter: { number, type } }, i) => (
                                <tr>
                                    <td scope="col">{++i}</td>
                                    <td>{type}</td>
                                    <td>{number}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div className="col-md-6">
                <h3 className="mb-5">Surat Keluar</h3>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Jenis Surat</th>
                            <th scope="col">Nomor Surat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {outgoingLetters?.map(
                            ({ letter: { number, type } }, i) => (
                                <tr>
                                    <td scope="col">{++i}</td>
                                    <td>{type}</td>
                                    <td>{number}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Report
