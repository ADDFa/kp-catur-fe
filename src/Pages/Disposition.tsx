import { useEffect, useState } from "react"
import { get } from "../Functions/Api"
import ButtonDetail from "../Components/Buttons/ButtonDetail"

const Disposition = () => {
    const [dispositions, setDispositions] = useState<ResponseT.DataT[]>()

    useEffect(() => {
        const getDispositions = async () => {
            const res = await get("disposition")
            if (res?.ok) setDispositions(res.result)
        }

        getDispositions()
    }, [])

    return (
        <div>
            <h3 className="fw-bold mb-5">Disposisi Surat Masuk Saya</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Pengirim</th>
                        <th scope="col" className="text-center">
                            Status Disposisi
                        </th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dispositions?.map(
                        (
                            {
                                incoming_letter: { disposition_status, sender },
                                id
                            },
                            i
                        ) => (
                            <tr key={i}>
                                <th scope="col">{++i}</th>
                                <td>{sender}</td>
                                <td className="text-center">
                                    <button
                                        className={`btn btn-${
                                            disposition_status === "process"
                                                ? "warning"
                                                : "success"
                                        }`}
                                    >
                                        {disposition_status === "process"
                                            ? "Proses"
                                            : "Selesai"}
                                    </button>
                                </td>
                                <td className="d-flex justify-content-center gap-2">
                                    <ButtonDetail to={`/disposition/${id}`} />
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Disposition
