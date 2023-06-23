import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Input from "../../Components/Input"
import Toast from "../../Components/Toast"
import { get, put } from "../../Functions/Api"
import Select from "../../Components/Select"

const UpdateLetter = () => {
    const { type, id } = useParams()
    const [letter, setLetter] = useState<ResponseT.DataT>()
    const [categories, setCategories] = useState<ResponseT.DataT[]>()
    const title = type === "incoming" ? "Masuk" : "Keluar"

    useEffect(() => {
        async function getData() {
            const letter = await get(`letter/${type}/${id}`)
            const categories = await get("letter/category")
            setLetter(letter?.result.data)
            setCategories(categories?.result)
        }

        getData()
    }, [type, id])

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const res = await put(`letter/${id}`, evt.currentTarget)
        if (!res?.ok) return

        Toast.fire({
            icon: "success",
            text: "Berhasil mengubah data surat."
        })
    }

    return (
        <>
            <h4>Ubah Surat {title}</h4>

            <form onSubmit={save}>
                <input
                    type="hidden"
                    name="as"
                    value={type === "incoming" ? "in" : "out"}
                />

                {letter && (
                    <div className="row">
                        <div className="col-md-6">
                            <Input
                                label="Nomor Surat"
                                type="text"
                                id="number"
                                name="number"
                                defaultValue={letter.letter.number}
                            />
                            <Input
                                label="Jenis Surat"
                                type="text"
                                id="type"
                                name="type"
                                defaultValue={letter?.letter.type}
                            />
                            <Input
                                label="Perihal"
                                type="text"
                                id="regarding"
                                name="regarding"
                                defaultValue={letter?.letter.regarding}
                            />
                            <Input
                                label="Tanggal Surat"
                                type="date"
                                id="date"
                                name="date"
                                defaultValue={
                                    letter?.letter.date || `2023-06-18`
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <Select
                                label="Kategori Surat"
                                name="category"
                                id="category"
                                defaultValue="Pilih Kategori"
                            >
                                {categories?.map(({ category, id }, i) => (
                                    <option key={++i} value={id}>
                                        {category}
                                    </option>
                                ))}
                            </Select>
                            {type === "incoming" ? (
                                <>
                                    <Input
                                        label="Pengirim"
                                        type="text"
                                        id="sender"
                                        name="sender"
                                        placeholder="SMAN 9"
                                        defaultValue={letter?.sender}
                                    />
                                    <Input
                                        id="letter_image"
                                        label="Upload Surat"
                                        name="letter_image"
                                        type="file"
                                        accept=".pdf"
                                    />
                                </>
                            ) : (
                                <Input
                                    label="Tujuan"
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    placeholder="Kepala Sekolah SMAN 9"
                                    defaultValue={letter?.destination}
                                />
                            )}
                        </div>
                    </div>
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
