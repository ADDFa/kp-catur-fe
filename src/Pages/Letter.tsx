import { Link, useParams, useNavigate } from "react-router-dom"
import { Suspense, lazy, useEffect } from "react"

const IncomingLetter = lazy(() => import("./Letters/IncomingLetter"))
const OutgoingLetter = lazy(() => import("./Letters/OutgoingLetter"))

const Letter = () => {
    const type = useParams().type
    const navigate = useNavigate()

    const getLinkElement = (href: string) => {
        return document.querySelector(`#outlet [href="${href}"]`)
    }

    useEffect(() => {
        getLinkElement(window.location.pathname)?.classList.remove(
            "link-underline-opacity-0"
        )
    }, [])

    const changeActive = (evt: React.MouseEvent<HTMLAnchorElement>) => {
        const linkElements =
            evt.currentTarget.parentElement?.querySelectorAll("a")
        linkElements?.forEach((link) =>
            link.classList.add("link-underline-opacity-0")
        )
        getLinkElement(evt.currentTarget.pathname)?.classList.remove(
            "link-underline-opacity-0"
        )
    }

    const navigateToCreate = (type: string | undefined) => {
        if (!type) return

        navigate(`/letter/${type}/create`)
    }

    return (
        <div className="container">
            <div className="d-flex align-items-center mb-5 fs-5 justify-content-between">
                <div className="d-flex align-items-center gap-4">
                    <Link
                        className="link-offset-2 link-offset-3-hover text-dark link-underline-dark link-underline-opacity-0 link-underline-opacity-75-hover"
                        to={`/letter/incoming`}
                        onClick={changeActive}
                    >
                        Surat Masuk
                    </Link>
                    <Link
                        className="link-offset-2 link-offset-3-hover text-dark link-underline-dark link-underline-opacity-0 link-underline-opacity-75-hover"
                        to={`/letter/outgoing`}
                        onClick={changeActive}
                    >
                        Surat Keluar
                    </Link>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => navigateToCreate(type)}
                >
                    + Tambah Surat
                </button>
            </div>

            {type === "incoming" && (
                <Suspense fallback="">
                    <IncomingLetter />
                </Suspense>
            )}
            {type === "outgoing" && (
                <Suspense fallback="">
                    <OutgoingLetter />
                </Suspense>
            )}
        </div>
    )
}

export default Letter
