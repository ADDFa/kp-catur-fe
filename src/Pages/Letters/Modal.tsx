import { EventHandler, useEffect, useState } from "react"
import Select from "../../Components/Select"
import handleRequest from "../../Functions/HandleRequest"

const Modal = () => {
    const [options, setOption] = useState<SelectT.Option[]>()

    useEffect(() => {
        const options: SelectT.Option[] = []

        async function getUsers() {
            const res = await handleRequest("get", "user")
            if (!res) return

            res?.result.data.map((user: Record<string, string>) => {
                options.push({
                    key: user.id,
                    value: user.name
                })
            })

            setOption(options)
        }

        getUsers()
    }, [])

    const disposition = (evt: React.FormEvent<HTMLFormElement>) => {
        //
    }

    return (
        <>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={disposition}>
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
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
                            {options && (
                                <Select
                                    label="Pengguna"
                                    selectAttribute={{
                                        id: "pengguna",
                                        name: "pengguna"
                                    }}
                                    options={options}
                                />
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Batal
                            </button>
                            <button type="button" className="btn btn-primary">
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
