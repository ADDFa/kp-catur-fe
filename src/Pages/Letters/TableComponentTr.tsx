import { useNavigate } from "react-router-dom"
import ButtonAction from "./ButtonAction"
import handleRequest from "../../Functions/HandleRequest"
import Toast from "../../Components/Toast"
import ConfirmDialog from "../../Components/ConfirmDialog"

const TableComponentTr = ({
    no,
    letterNumber,
    letterType,
    destination,
    sender,
    id,
    type,
    setLetters,
    date
}: Letter.TableComponentTr) => {
    const navigate = useNavigate()

    const actions: Letter.ActionT[] = [
        {
            color: "success",
            children: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
            ),
            action: () => navigate(`/letter/${type}/${id}`)
        },
        {
            color: "warning",
            children: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
            ),
            action: () => navigate(`/letter/${type}/${id}/edit`)
        },
        {
            color: "danger",
            children: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
            ),
            action: () => {
                ConfirmDialog(
                    async () => {
                        const res = await handleRequest(
                            "delete",
                            `letter/${id}`
                        )
                        const letters = await handleRequest(
                            "get",
                            `letter/${type}`
                        )
                        if (!res || !letters) return

                        setLetters(letters.result.data)
                        Toast.fire({
                            icon: "success",
                            text: "Berhasil menghapus surat."
                        })
                    },
                    {
                        title: "Apakah anda yakin?",
                        text: "Data akan dihapus permanen.",
                        confirmButtonText: "Hapus",
                        cancelButtonText: "Batal",
                        timer: 2000
                    }
                )
            }
        }
    ]

    return (
        <tr data-letter_id={id}>
            <th scope="row">{no}</th>
            <td>{letterNumber}</td>
            <td>{letterType}</td>
            <td>{date}</td>
            {type === "incoming" && (
                <td className="d-flex gap-1 justify-content-center">
                    <button
                        className="btn btn-secondary text-light"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-send-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg>
                    </button>
                </td>
            )}
            <td>{destination ? destination : sender}</td>
            <td className="d-flex justify-content-center gap-2">
                {actions.map(({ color, children, action }, i) => (
                    <ButtonAction key={i} color={color} action={action}>
                        {children}
                    </ButtonAction>
                ))}
            </td>
        </tr>
    )
}

export default TableComponentTr
