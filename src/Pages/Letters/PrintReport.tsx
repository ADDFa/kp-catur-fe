import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { get } from "../../Functions/Api"

const PrintReport = () => {
    const location = useLocation()
    const [incomingLetters, setIncomingLetters] = useState<ResponseT.DataT[]>()
    const [outgoingLetters, setoutgoingLetters] = useState<ResponseT.DataT[]>()

    useEffect(() => {
        const getReport = async () => {
            const incomingLetters = await get(
                `letter/incoming/report${location.search}`
            )
            const outgoingLetters = await get(
                `letter/outgoing/report${location.search}`
            )

            if (incomingLetters?.ok) {
                setIncomingLetters(incomingLetters.result.data)
            }

            if (outgoingLetters?.ok) {
                setoutgoingLetters(outgoingLetters.result.data)
            }
        }

        getReport()
    }, [location.search])

    const print: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
        evt.currentTarget.classList.add("d-none")
        window.print()
        evt.currentTarget.classList.remove("d-none")
    }

    const getDispositionStatus = (status: string | null) => {
        return status === "selesai" ? "Selesai" : "Proses"
    }

    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <h2
                        style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            textAlign: "center",
                            margin: "3rem 0"
                        }}
                    >
                        Laporan Surat Masuk
                    </h2>

                    <div className="d-flex justify-content-end my-4">
                        <button className="btn btn-primary" onClick={print}>
                            Print
                        </button>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">
                                    No
                                </th>
                                <th scope="col">Nomor Surat</th>
                                <th scope="col">Jenis Surat</th>
                                <th scope="col">Kategori Surat</th>
                                <th scope="col">Tentang</th>
                                <th scope="col">Pengirim</th>
                                <th scope="col">Status Disposisi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomingLetters?.map(
                                (
                                    {
                                        disposition_status,
                                        sender,
                                        letter: {
                                            number,
                                            regarding,
                                            type,
                                            category: { category }
                                        }
                                    },
                                    i
                                ) => (
                                    <tr key={i}>
                                        <th className="text-center" scope="row">
                                            {++i}
                                        </th>
                                        <td>{number}</td>
                                        <td>{type}</td>
                                        <td>{category}</td>
                                        <td>{regarding}</td>
                                        <td>{sender}</td>
                                        <td>
                                            {getDispositionStatus(
                                                disposition_status
                                            )}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <h2
                        style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            textAlign: "center",
                            margin: "3rem 0"
                        }}
                    >
                        Laporan Surat Keluar
                    </h2>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="text-center" scope="col">
                                    No
                                </th>
                                <th scope="col">Nomor Surat</th>
                                <th scope="col">Jenis Surat</th>
                                <th scope="col">Kategori Surat</th>
                                <th scope="col">Tentang</th>
                                <th scope="col">Tujuan</th>
                                <th scope="col">Status Disposisi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {outgoingLetters?.map(
                                (
                                    {
                                        disposition_status,
                                        destination,
                                        letter: {
                                            number,
                                            regarding,
                                            type,
                                            category: { category }
                                        }
                                    },
                                    i
                                ) => (
                                    <tr key={i}>
                                        <th className="text-center" scope="row">
                                            {++i}
                                        </th>
                                        <td>{number}</td>
                                        <td>{type}</td>
                                        <td>{category}</td>
                                        <td>{regarding}</td>
                                        <td>{destination}</td>
                                        <td>
                                            {disposition_status === "process"
                                                ? "Proses"
                                                : "Selesai"}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PrintReport
