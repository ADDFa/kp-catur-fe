import { useEffect, useState } from "react"
import Input from "../../Components/Input"
import Toast from "../../Components/Toast"
import { el } from "../../Functions/GetElement"

const Modal = () => {
    // const [users, setUsers] = useState<SelectT.Option[]>()

    useEffect(() => {
        // const options: SelectT.Option[] = []

        async function getUsers() {
            // const res = await handleRequest("get", "user")
            // if (!res) return
            // res?.result.data.map((user: Record<string, string>) => {
            //     return options.push({
            //         key: user.id,
            //         value: user.name
            //     })
            // })
            // setUsers(options)
        }

        getUsers()
    }, [])

    const disposition = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const { letter_id } = evt.currentTarget.dataset
        if (!letter_id) return

        const incomingLetterIdEl = document.createElement("input")
        incomingLetterIdEl.setAttribute("name", "incoming_letter_id")
        incomingLetterIdEl.setAttribute("value", letter_id)
        incomingLetterIdEl.setAttribute("type", "hidden")
        evt.currentTarget.append(incomingLetterIdEl)

        // const res = await handleRequest(
        //     "post",
        //     "disposition",
        //     evt.currentTarget
        // )

        // if (!res) return

        el(`button[data-letter_id="${letter_id}"]`)?.classList.replace(
            "btn-secondary",
            "btn-warning"
        )
        const btnClose = el(".modal .btn-close") as HTMLButtonElement
        btnClose.click()

        Toast.fire({
            icon: "success",
            text: "Berhasil mendisposisikan"
        })
    }

    return (
        <>
            <div
                className="modal fade"
                id="dispositionModal"
                tabIndex={-1}
                aria-labelledby="dispositionModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={disposition}>
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="dispositionModalLabel"
                            >
                                Disposisikan Kepada
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {/* {users && (
                                <>
                                    <Select
                                        label="Pengguna"
                                        id="to"
                                        name="to"
                                        options={users}
                                    />
                                    <Input
                                        label="Pesan Disposisi"
                                        name="message"
                                        id="message"
                                    />
                                </>
                            )} */}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Batal
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Kirim
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Modal
