import { Link, useParams } from "react-router-dom"
import { Suspense, lazy, useCallback, useEffect, useState } from "react"
import AmountIsDisplay from "./Components/AmountIsDisplay"
import DateFilter from "./Components/DateFilter"
import { el } from "../Functions/GetElement"
import handleRequest from "../Functions/HandleRequest"

const IncomingLetter = lazy(() => import("./Letters/IncomingLetter"))
const OutgoingLetter = lazy(() => import("./Letters/OutgoingLetter"))

const Letter = () => {
    const [letters, setLetters] = useState<LetterT[]>([])
    const { type } = useParams()

    const getLetters = useCallback(async () => {
        const take = (el("#amountIsDisplay") as HTMLSelectElement).value
        let endpoint = `letter/${type}?take=${take}`

        const from = (el(`[name="from"]`) as HTMLInputElement).value
        const until = (el(`[name="until"]`) as HTMLInputElement).value
        if (from && until) endpoint += `&range=${from}_${until}`

        const res = await handleRequest("get", endpoint)
        setLetters(res?.result.data)
    }, [type])

    const setActive = useCallback(() => {
        const pathname = window.location.pathname
        const element = el(`#outlet [href="${pathname}"]`)
        element?.classList.remove("link-underline-opacity-0")

        if (pathname === "/letter/incoming") {
            el(`#outlet [href="/letter/outgoing"]`)?.classList.add(
                "link-underline-opacity-0"
            )
        } else {
            el(`#outlet [href="/letter/incoming"]`)?.classList.add(
                "link-underline-opacity-0"
            )
        }
    }, [])

    useEffect(() => {
        getLetters()
        setActive()
    }, [type, getLetters, setActive])

    return (
        <div className="container">
            <div className="d-flex align-items-center mb-5 fs-5 justify-content-between">
                <div className="d-flex align-items-center gap-4">
                    <Link
                        className="link-offset-2 link-offset-3-hover text-dark link-underline-dark link-underline-opacity-0 link-underline-opacity-75-hover"
                        to={`/letter/incoming`}
                    >
                        Surat Masuk
                    </Link>
                    <Link
                        className="link-offset-2 link-offset-3-hover text-dark link-underline-dark link-underline-opacity-0 link-underline-opacity-75-hover"
                        to={`/letter/outgoing`}
                    >
                        Surat Keluar
                    </Link>
                </div>
                <Link to={`/letter/${type}/create`} className="btn btn-primary">
                    + Tambah Surat
                </Link>
            </div>

            <div className="d-flex justify-content-between my-5">
                <AmountIsDisplay selected={() => getLetters()} />
                <DateFilter inputed={() => getLetters()} />
            </div>

            {type === "incoming" && (
                <Suspense fallback="">
                    <IncomingLetter letters={letters} setLetters={setLetters} />
                </Suspense>
            )}
            {type === "outgoing" && (
                <Suspense fallback="">
                    <OutgoingLetter letters={letters} setLetters={setLetters} />
                </Suspense>
            )}
        </div>
    )
}

export default Letter
