import { Link, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { el, elAll } from "../Functions/GetElement"
import Modal from "./Letters/Modal"
import { get } from "../Functions/Api"
import SelectDataDisplayed from "./Components/SelectDataDisplayed"
import FilterRangeByDate from "./Components/FilterRangeByDate"
import ButtonActions from "./Components/ButtonActions"

const Letter = () => {
    const [letters, setLetters] = useState<LetterT[]>([])
    const { type } = useParams()

    const getLetters = useCallback(async () => {
        const take = (el("#amountIsDisplay") as HTMLSelectElement)?.value
        const from = (el(`[name="from"]`) as HTMLInputElement)?.value
        const until = (el(`[name="until"]`) as HTMLInputElement)?.value

        let letterEndpoint = `letter/${type}?take=${take}`
        if (from && until) letterEndpoint += `&range=${from}_${until}`

        const res = await get(letterEndpoint)
        setLetters(res.result.data)
    }, [type])

    const setActive = () => {
        const currentActive = el(`.letter-link .active`)
        currentActive?.classList.add("link-underline-opacity-0")
        currentActive?.classList.remove("active")

        const active = el(`a[href="/letter/${type}"]`)
        active?.classList.remove("link-underline-opacity-0")
        active?.classList.add("active")
    }

    useEffect(() => {
        getLetters()
        setActive()
    }, [type, getLetters])

    return (
        <div className="container">
            <div className="d-flex align-items-center mb-5 fs-5 justify-content-between">
                <div className="d-flex align-items-center gap-4 letter-link">
                    {["Surat Masuk", "Surat Keluar"].map((link, i) => (
                        <Link
                            key={i}
                            className={`link-offset-2 link-underline-opacity-0 link-offset-3-hover text-dark link-underline-dark link-underline-opacity-75-hover`}
                            to={`/letter/${i === 0 ? "incoming" : "outgoing"}`}
                        >
                            {link}
                        </Link>
                    ))}
                </div>
                <Link to={`/letter/${type}/create`} className="btn btn-primary">
                    + Tambah Surat
                </Link>
            </div>

            <div className="d-flex justify-content-between my-5">
                <SelectDataDisplayed onSelect={getLetters} />
                <FilterRangeByDate onInput={getLetters} />
            </div>

            <div className="row w-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Jenis Surat</th>
                            <th scope="col">Nomor Surat</th>
                            <th scope="col" className="text-center">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {letters.map((letter, i) => {
                            const { letter_type, reference_number } =
                                letter.letter

                            return (
                                <tr key={i}>
                                    <th scope="row">{++i}</th>
                                    <td>{letter_type}</td>
                                    <td>{reference_number}</td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        <ButtonActions button="show" />
                                        <ButtonActions button="edit" />
                                        <ButtonActions button="delete" />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Modal />
        </div>
    )
}

export default Letter
