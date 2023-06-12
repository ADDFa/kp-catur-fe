import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import toCapitalize from "../../Functions/ToCapitalize"
import { get } from "../../Functions/Api"
import Ul from "../Components/Ul"
import Li from "../Components/Li"

const DetailLetter = () => {
    const [letter, setLetter] = useState<ResponseT.DataT>()
    const { type, id } = useParams()
    const title = type === "incoming" ? "Masuk" : "Keluar"

    useEffect(() => {
        async function getLetter() {
            const res = await get(`letter/${type}/${id}`)
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
                                text={letter.letter.number}
                            />
                            <Li label="Jenis Surat" text={letter.letter.type} />
                        </Ul>
                        <Ul>
                            <Li
                                label="Perihal"
                                text={letter.letter.regarding}
                            />
                            {type === "incoming" ? (
                                <Li
                                    label="Pengirim"
                                    text={toCapitalize(letter.sender)}
                                />
                            ) : (
                                <Li
                                    label="Tujuan"
                                    text={toCapitalize(letter.destination)}
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
