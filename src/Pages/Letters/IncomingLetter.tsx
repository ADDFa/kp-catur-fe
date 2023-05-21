import { useEffect, useState } from "react"
import Table from "./Table"
import TableComponentTr from "./TableComponentTr"
import handleRequest from "../../Functions/HandleRequest"

const IncomingLetter = () => {
    const [letters, setLetters] = useState<LetterT[]>([])

    useEffect(() => {
        async function getLetters() {
            const res = await handleRequest("get", "letter/incoming")
            setLetters(res?.result.data)
        }

        getLetters()
    }, [])

    return (
        <div className="row w-100">
            <Table letterType="in">
                {letters &&
                    letters.map((letter, i) => {
                        const { letter_type, reference_number, id } =
                            letter.letter

                        return (
                            <TableComponentTr
                                id={id}
                                letterNumber={reference_number}
                                no={++i}
                                letterType={letter_type}
                                sender={letter.sender}
                                key={i}
                                type="incoming"
                                setLetters={setLetters}
                            />
                        )
                    })}
            </Table>
        </div>
    )
}

export default IncomingLetter
