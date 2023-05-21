import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import handleRequest from "../../Functions/HandleRequest"
import toCapitalize from "../../Functions/ToCapitalize"

const Ul = ({ children }: DetailLetter.UlT) => {
    return <ul className="list-group list-group-flush col">{children}</ul>
}

const Li = ({ label, value }: DetailLetter.LiT) => {
    return (
        <li className="list-group-item p-0 mb-5">
            <h5 className="fs-6">{label}</h5>
            <p>{value}</p>
        </li>
    )
}

const DetailLetter = () => {
    const [letter, setLetter] = useState<LetterT>()
    const { type, id } = useParams()
    const title = type === "incoming" ? "Masuk" : "Keluar"

    useEffect(() => {
        async function getLetter() {
            const res = await handleRequest("get", `letter/${type}/${id}`)
            setLetter(res?.result.data)
        }

        getLetter()
    }, [type, id])

    return (
        <>
            <h4 className="mb-5">Detail Surat {title}</h4>

            <div className="row gap-5">
                {letter && (
                    <>
                        <Ul>
                            <Li
                                label="Nomor Surat"
                                value={letter.letter.reference_number}
                            />
                            <Li
                                label="Jenis Surat"
                                value={letter.letter.letter_type}
                            />
                            <Li
                                label="Perihal"
                                value={letter.letter.regarding}
                            />
                        </Ul>
                        <Ul>
                            <Li
                                label={`Tanggal ${title}`}
                                value={letter.letter.date}
                            />
                            <Li
                                label="Kategori Surat"
                                value={toCapitalize(letter.letter.category)}
                            />
                            {type === "incoming" ? (
                                <Li
                                    label="Pengirim"
                                    value={toCapitalize(letter.sender)}
                                />
                            ) : (
                                <Li
                                    label="Tujuan"
                                    value={toCapitalize(letter.destination)}
                                />
                            )}
                        </Ul>
                    </>
                )}
            </div>

            <div className="d-flex justify-content-end gap-2 mt-5">
                <Link className="btn btn-warning" to={`/letter/${type}`}>
                    Kembali
                </Link>
            </div>
        </>
    )
}

export default DetailLetter
