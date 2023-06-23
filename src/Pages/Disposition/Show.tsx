import { Link, useNavigate, useParams } from "react-router-dom"
import { get, patch, post } from "../../Functions/Api"
import Li from "../Components/Li"
import Ul from "../Components/Ul"
import { useEffect, useState } from "react"
import ConfirmDialog from "../../Components/ConfirmDialog"
import Toast from "../../Components/Toast"
import usePayload from "../../Hooks/usePayload"
import Modal from "../../Components/Modal"
import Select from "../../Components/Select"
import { el } from "../../Functions/GetElement"
import useFormBuilder from "../../Hooks/useFormBuilder"

const Show: React.FC = () => {
    const formBuilder = useFormBuilder()
    const [disposition, setDisposition] = useState<ResponseT.DataT>()
    const [users, setUsers] = useState<ResponseT.DataT[]>()
    const {
        user: { role }
    } = usePayload()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getDisposition = async () => {
            const res = await get(`disposition/${id}`)
            if (res?.ok) setDisposition(res.result)
        }

        const getUser = async () => {
            const res = await get(`user`)
            setUsers(res?.result.data)
        }

        getUser()
        getDisposition()
    }, [id])

    const dispositionFinish = () => {
        ConfirmDialog(
            async () => {
                const res = await patch(`disposition/${id}`)
                if (!res?.ok) return

                const disposition = await get(`disposition/${id}`)
                if (disposition?.ok) setDisposition(disposition.result)

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

    const keepOnDisposition = async () => {
        const user = el("#keep-on-disposition #user") as HTMLSelectElement
        const btnClose = el(
            "#keep-on-disposition .btn-close"
        ) as HTMLButtonElement
        const form = formBuilder(
            {
                key: "user_id",
                value: user.value
            },
            {
                key: "disposition_id",
                value: id || ""
            }
        )

        const res = await post("disposition/next", form)
        if (res?.ok) {
            Toast.fire({
                icon: "success",
                text: "Berhasil meneruskan disposisi"
            })
            btnClose.click()

            setTimeout(() => {
                navigate("/disposition")
            }, 400)
        }
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
                            {role.role !== "Operator" && (
                                <>
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
                                    {disposition.incoming_letter
                                        .disposition_status === "process" && (
                                        <Modal
                                            id="keep-on-disposition"
                                            buttonText="Teruskan Disposisi"
                                            onConfirmed={keepOnDisposition}
                                            title="Diposisikan Kepada"
                                            buttonColor="warning"
                                        >
                                            <Select
                                                id="user"
                                                name="user"
                                                label="Pilih Pengguna"
                                            >
                                                {users &&
                                                    users.map(
                                                        ({
                                                            name,
                                                            id,
                                                            role: {
                                                                role: roleUser
                                                            }
                                                        }) => {
                                                            if (
                                                                roleUser ===
                                                                "Operator"
                                                            ) {
                                                                return null
                                                            }

                                                            return (
                                                                <option
                                                                    value={id}
                                                                    key={id}
                                                                >
                                                                    {name}
                                                                </option>
                                                            )
                                                        }
                                                    )}
                                            </Select>
                                        </Modal>
                                    )}
                                </>
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
