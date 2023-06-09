import { useCallback, useEffect, useState } from "react"
import { destroy, get, post } from "../Functions/Api"
import FilterDate from "./Letters/FilterDate"
import LinkOffsetHover from "../Components/LinkOffsetHover"
import SelectFloating from "../Components/SelectFloating"
import ButtonAdd from "../Components/Buttons/ButtonAdd"
import ButtonEdit from "../Components/Buttons/ButtonEdit"
import ButtonDetail from "../Components/Buttons/ButtonDetail"
import ButtonDelete from "../Components/Buttons/ButtonDelete"
import { useParams } from "react-router-dom"
import Toast from "../Components/Toast"
import Input from "../Components/Input"
import { el, gi } from "../Functions/GetElement"
import Select from "../Components/Select"

const Letter = () => {
    const { type } = useParams()
    const [letters, setLetters] = useState<ResponseT.DataT[]>()
    const [users, setUsers] = useState<ResponseT.DataT[]>()
    const [take, setTake] = useState<number | string>(5)
    const [before, setBefore] = useState("")
    const [after, setAfter] = useState("")
    const [incomingLetterId, setIncomingLetterId] = useState<number>(0)

    const getLetters = useCallback(async () => {
        let path = `letter/${type}?take=${take}`
        if (before) path += `&before=${before}`
        if (after) path += `&after=${after}`

        const res = await get(path)
        if (res?.ok) setLetters(res.result.data)
    }, [take, before, after, type])

    const getUsers = useCallback(async () => {
        const res = await get("user")
        if (res?.ok) setUsers(res.result.data)
    }, [])

    useEffect(() => {
        getLetters()
        getUsers()
    }, [getLetters, getUsers])

    const changeTake: React.FormEventHandler<HTMLSelectElement> = (evt) => {
        setTake(evt.currentTarget.value)
    }

    const deleteLetter = async (id: number) => {
        const res = await destroy(`letter/${id}`, {
            key: "as",
            value: type === "incoming" ? "in" : "out"
        })
        if (res?.ok) {
            Toast.fire({
                icon: "success",
                text: "Berhasil menghapus surat"
            })
            getLetters()
        }
    }

    const disposition = async () => {
        const form = gi<HTMLFormElement>("disposition-form")
        const res = await post("disposition", form)

        if (!res?.ok) return

        getLetters()
        el<HTMLButtonElement>(".btn-close").click()
        Toast.fire({
            icon: "success",
            text: "Surat Berhasil Didisposisikan"
        })
    }

    const getBtnColor = (status: string): ButtonColorT => {
        if (status === "process") return "warning"
        if (status === "finish") return "success"

        return "secondary"
    }

    return (
        <div className="container">
            <div className="d-flex align-items-center mb-5 fs-5 justify-content-between">
                <div className="d-flex align-items-center gap-4 letter-link">
                    <LinkOffsetHover
                        to="/letter/incoming"
                        active={type === "incoming"}
                    >
                        Surat Masuk
                    </LinkOffsetHover>
                    <LinkOffsetHover
                        to="/letter/outgoing"
                        active={type === "outgoing"}
                    >
                        Surat Keluar
                    </LinkOffsetHover>
                </div>
                <ButtonAdd to={`/letter/${type}/create`}>
                    + Tambah Surat
                </ButtonAdd>
            </div>

            <div className="d-flex justify-content-between my-5">
                <SelectFloating
                    id="amount-display"
                    name="amount_display"
                    label="Tampilkan Sebanyak"
                    onInput={changeTake}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </SelectFloating>
                <FilterDate setAfter={setAfter} setBefore={setBefore} />
            </div>

            <div className="row w-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Jenis Surat</th>
                            <th scope="col">Nomor Surat</th>
                            {type === "incoming" && (
                                <th scope="col" className="text-center">
                                    Disposisikan
                                </th>
                            )}
                            <th scope="col" className="text-center">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {letters?.map(
                            (
                                {
                                    letter: { type: jenis, number, id },
                                    disposition_status
                                },
                                i
                            ) => (
                                <tr key={i}>
                                    <th scope="col">{++i}</th>
                                    <td>{jenis}</td>
                                    <td>{number}</td>
                                    {type === "incoming" && (
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className={`btn btn-${getBtnColor(
                                                    disposition_status
                                                )}`}
                                                data-bs-toggle="modal"
                                                data-bs-target="#disposition"
                                                disabled={
                                                    disposition_status ===
                                                    "finish"
                                                }
                                                onClick={() =>
                                                    setIncomingLetterId(id)
                                                }
                                            >
                                                <i className="bi bi-send-fill text-light" />
                                            </button>
                                        </td>
                                    )}
                                    <td className="d-flex justify-content-center gap-2">
                                        <ButtonEdit
                                            to={`/letter/${type}/${id}/edit`}
                                        />
                                        <ButtonDetail
                                            to={`/letter/${type}/${id}`}
                                        />
                                        <ButtonDelete
                                            action={() => deleteLetter(id)}
                                        />
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <div
                className="modal fade"
                id="disposition"
                tabIndex={-1}
                aria-labelledby="dispositionLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="dispositionLabel"
                            >
                                Modal title
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form
                                id="disposition-form"
                                className="text-start"
                                onSubmit={(evt) => evt.preventDefault()}
                            >
                                <input
                                    type="hidden"
                                    name="incoming_letter_id"
                                    value={incomingLetterId}
                                />
                                <Select
                                    id="user_id"
                                    label="User"
                                    name="user_id"
                                    defaultValue="Pilih User"
                                >
                                    {users?.map(
                                        ({ id, role: { role }, name }, i) => {
                                            return role !== "Operator" ? (
                                                <option key={i} value={id}>
                                                    {name}
                                                </option>
                                            ) : (
                                                ""
                                            )
                                        }
                                    )}
                                </Select>
                                <Input
                                    label="Pesan"
                                    id="message"
                                    name="message"
                                />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={disposition}
                            >
                                Disposisikan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Letter
