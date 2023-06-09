import { useEffect, useState } from "react"
import { get } from "../Functions/Api"
import Modal from "../Components/Modal"
import Input from "../Components/Input"
import { gi } from "../Functions/GetElement"
import Toast from "../Components/Toast"

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

    const print: React.FormEventHandler<HTMLButtonElement> = (evt) => {
        const before = gi<HTMLInputElement>("before").value
        const after = gi<HTMLInputElement>("after").value

        if (!before || !after) {
            return Toast.fire({
                icon: "warning",
                text: "Isi tanggal terlebih dahulu"
            })
        }

        window.open(`/report/print?after=${after}&before=${before}`)
    }

    return (
        <div className="row">
            <div className="col-md-12 my-5 d-flex justify-content-end">
                <Modal
                    buttonText={
                        <>
                            <i className="bi bi-printer me-2" />
                            Cetak Laporan
                        </>
                    }
                    id="cetak-laporan"
                    title="Cetak Laporan"
                    onConfirmed={print}
                >
                    <div className="py-3">
                        <Input
                            id="after"
                            name="after"
                            type="date"
                            label="Tanggal Akhir"
                        />
                        <Input
                            id="before"
                            name="before"
                            type="date"
                            label="Tanggal Awal"
                        />
                    </div>
                </Modal>
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
                                <tr key={i}>
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
                                <tr key={i}>
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
