import { Link, useNavigate, useParams } from "react-router-dom"
import Input from "../../Components/Input"
import Select from "../../Components/Select"
import Toast from "../../Components/Toast"
import handleRequest from "../../Functions/HandleRequest"

const CreateLetter = () => {
    const type = useParams().type
    const title = type === "incoming" ? "Masuk" : "Keluar"
    const navigate = useNavigate()

    const save = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        const res = await handleRequest(
            "post",
            `letter/${type}`,
            evt.currentTarget
        )
        if (!res) return

        Toast.fire({
            icon: "success",
            text: `Berhasil menambahkan surat ${title.toLowerCase()}`
        })
        setTimeout(() => {
            navigate(`/letter/${type}`)
        }, 300)
    }

    const inputs: InputT[] = [
        {
            input: {
                type: "text",
                id: "reference_number",
                name: "reference_number",
                placeholder: "107/20/109"
            },
            label: "Nomor Surat"
        },
        {
            input: {
                type: "date",
                id: "date",
                name: "date",
                defaultValue: "2023-05-20"
            },
            label: `Tanggal Surat ${title}`
        },
        {
            input: {
                type: "text",
                id: "letter_type",
                name: "letter_type",
                placeholder: "Surat Permohonan"
            },
            label: "Jenis Surat"
        },
        {
            input: {
                type: "text",
                id: "regarding",
                name: "regarding",
                placeholder: "HUT SMAN 9"
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

    return (
        <>
            <h4>Tambah Surat {title}</h4>

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
                                placeholder: "SMAN 9"
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
                                placeholder: "Kepala Sekolah SMAN 9"
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

export default CreateLetter
