import { Link, useParams } from "react-router-dom"
import { get, patch } from "../../Functions/Api"
import Li from "../Components/Li"
import Ul from "../Components/Ul"
import { useEffect, useState } from "react"
import ConfirmDialog from "../../Components/ConfirmDialog"
import Toast from "../../Components/Toast"

const Show: React.FC = () => {
    const [disposition, setDisposition] = useState<ResponseT.DataT>()
    const { id } = useParams()

    useEffect(() => {
        const getDisposition = async () => {
            const res = await get(`disposition/${id}`)
            if (res?.ok) setDisposition(res.result)
        }

        getDisposition()
    }, [id])

    const dispositionFinish = () => {
        ConfirmDialog(
            async () => {
                const res = await patch(`disposition/${id}`)
                if (!res?.ok) return

                if (disposition) {
                    disposition.incoming_letter.disposition_status =
                        res.result.disposition_status
                }
                Toast.fire({
                    icon: "success",
                    text: "Disposisi Diselesaikan!"
                })
            },
            {
                text: "Tandai Disposisi Telah Diproses?",
                icon: "question",
                cancelButtonText: "Batal",
                timerProgressBar: false,
                timer: 0
            }
        )
    }

    return (
        <>
            <h4 className="mb-5">Detail Disposisi Surat</h4>

            <div className="row gap-5">
                {disposition && (
                    <>
                        <Ul>
                            <Li
                                label="Pengirim"
                                text={disposition.incoming_letter.sender}
                            />
                            <Li
                                label="Pesan Disposisi"
                                text={disposition.message}
                            />
                            <Li
                                label="Nomor Surat"
                                text={disposition.incoming_letter.letter.number}
                            />
                        </Ul>

                        <Ul>
                            <Li
                                label="Jenis Surat"
                                text={disposition.incoming_letter.letter.type}
                            />
                            <Li
                                label="Tentang"
                                text={
                                    disposition.incoming_letter.letter.regarding
                                }
                            />
                        </Ul>

                        <div className="d-flex justify-content-end gap-3">
                            <button
                                className="btn btn-success"
                                onClick={dispositionFinish}
                                disabled={
                                    disposition.incoming_letter
                                        .disposition_status === "finish"
                                }
                            >
                                Tandai Selesai
                            </button>
                            {disposition.incoming_letter.disposition_status ===
                                "process" && (
                                <button className="btn btn-warning text-light">
                                    Teruskan Disposisi
                                </button>
                            )}
                            <Link
                                to={"/disposition"}
                                className="btn btn-secondary"
                            >
                                Kembali
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Show
