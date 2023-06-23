import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { BASE_API } from "../../Functions/Api"

const ShowLetterFile = () => {
    const [searchParams] = useSearchParams()
    const embedRef = useRef<HTMLEmbedElement>(null)
    const fileName = searchParams.get("file_name")
    const [src, setSrc] = useState<string>()

    useEffect(() => {
        const getFile = () => {
            fetch(`${BASE_API}/letter/incoming/file?file_name=${fileName}`)
                .then((res) => res.blob())
                .then((res) => {
                    if (!embedRef.current) return
                    const blob = new Blob([res], {
                        type: "application/pdf"
                    })
                    const pdfUrl = URL.createObjectURL(blob)
                    setSrc(pdfUrl)
                })
        }

        getFile()
    }, [fileName])

    return (
        <embed
            src={src}
            type="application/pdf"
            ref={embedRef}
            width="800px"
            height="600px"
        />
    )
}

export default ShowLetterFile
