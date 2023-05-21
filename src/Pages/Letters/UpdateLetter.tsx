import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import handleRequest from "../../Functions/HandleRequest"
import Input from "../../Components/Input"
import Select from "../../Components/Select"
import Toast from "../../Components/Toast"

const UpdateLetter = () => {
    const { type, id } = useParams()
    const [letter, setLetter] = useState<LetterT>()
    const title = type === "incoming" ? "Masuk" : "Keluar"

    const inputs: InputT[] = [
        {
            input: {
                type: "text",
                id: "reference_number",
                name: "reference_number",
                defaultValue: letter?.letter.reference_number
            },
            label: "Nomor Surat"
        },
        {
            input: {
                type: "date",
                id: "date",
                name: "date",
                defaultValue: letter?.letter.date
            },
            label: `Tanggal Surat ${title}`
        },
        {
            input: {
                type: "text",
                id: "letter_type",
                name: "letter_type",
                defaultValue: letter?.letter.letter_type
            },
            label: "Jenis Surat"
        },
        {
            input: {
                type: "text",
                id: "regarding",
                name: "regarding",
                defaultValue: letter?.letter.regarding
            },
            label: "Perihal"
        }
    ]

    const categories: SelectT.Option[] = [
        {
            key: "penting",
            value: "Penting"
        },
        {
            key: "mendesak",
            value: "Mendesak"
        },
        {
            key: "biasa",
            value: "Biasa"
        }
    ]

    useEffect(() => {
        async function getLetter() {
            const res = await handleRequest("get", `letter/${type}/${id}`)
            setLetter(res?.result.data)
        }

        getLetter()
    }, [type, id])

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const res = await handleRequest(
            "put",
            `letter/${type}/${id}`,
            evt.currentTarget
        )
        if (!res) return
        Toast.fire({
            icon: "success",
            text: "Berhasil mengubah data surat."
        })
    }

    return (
        <>
            <h4>Ubah Surat {title}</h4>

            <form onSubmit={save}>
                {inputs.map((input, i) => (
                    <Input {...input} key={i} />
                ))}
                <Select
                    options={categories}
                    label="Kategori Surat"
                    selectAttribute={{
                        name: "category",
                        id: "category"
                    }}
                />
                {type === "incoming" ? (
                    <Input
                        {...{
                            input: {
                                type: "text",
                                id: "sender",
                                name: "sender",
                                defaultValue: letter?.sender
                            },
                            label: "Pengirim"
                        }}
                    />
                ) : (
                    <Input
                        {...{
                            input: {
                                type: "text",
                                id: "destination",
                                name: "destination",
                                defaultValue: letter?.destination
                            },
                            label: "Tujuan"
                        }}
                    />
                )}
                <div className="d-flex justify-content-end gap-2 mt-5">
                    <button className="btn btn-primary">Simpan</button>
                    <Link className="btn btn-warning" to={`/letter/${type}`}>
                        Kembali
                    </Link>
                </div>
            </form>
        </>
    )
}

export default UpdateLetter
