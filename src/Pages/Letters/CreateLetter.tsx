import { Link, useNavigate, useParams } from "react-router-dom"
import Input from "../../Components/Input"
import Toast from "../../Components/Toast"
import { get, post } from "../../Functions/Api"
import Select from "../../Components/Select"
import { useEffect, useState } from "react"

const CreateLetter = () => {
    const type = useParams().type as LetterTypeT
    const title = type === "incoming" ? "Masuk" : "Keluar"
    const navigate = useNavigate()
    const [categories, setCategories] = useState<ResponseT.DataT[]>()

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const res = await post(`letter`, evt.currentTarget)
        if (!res?.ok) return

        Toast.fire({
            icon: "success",
            text: `Berhasil menambahkan surat ${title.toLowerCase()}`
        })
        setTimeout(() => {
            navigate(`/letter/${type}`)
        }, 300)
    }

    useEffect(() => {
        const getCategory = async () => {
            const categories = await get("letter/category")
            setCategories(categories?.result)
        }

        getCategory()
    }, [])

    return (
        <>
            <h3 className="mb-5">Tambah Surat {title}</h3>

            <form onSubmit={save}>
                <input
                    type="hidden"
                    name="as"
                    value={type === "incoming" ? "in" : "out"}
                />

                <div className="row">
                    <div className="col-md-6">
                        <Input
                            label="Nomor Surat"
                            type="text"
                            id="number"
                            name="number"
                            placeholder="107/20/109"
                        />
                        <Input
                            label="Jenis Surat"
                            type="text"
                            id="type"
                            name="type"
                            placeholder="Surat Permohonan"
                        />
                        <Input
                            label="Perihal"
                            type="text"
                            id="regarding"
                            name="regarding"
                            placeholder="HUT SMAN 9"
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
                            />
                        )}
                    </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-5">
                    <button className="btn btn-primary">Simpan</button>
                    <Link className="btn btn-warning" to={`/letter`}>
                        Kembali
                    </Link>
                </div>
            </form>
        </>
    )
}

export default CreateLetter
