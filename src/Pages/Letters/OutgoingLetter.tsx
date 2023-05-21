import { useEffect, useState } from "react"
import Table from "./Table"
import TableComponentTr from "./TableComponentTr"
import handleRequest from "../../Functions/HandleRequest"

const OutgoingLetter = () => {
    const [letters, setLetters] = useState<LetterT[]>([])

    useEffect(() => {
        async function getLetters() {
            const res = await handleRequest("get", "letter/outgoing")
            setLetters(res?.result.data)
        }

        getLetters()
    }, [])

    return (
        <div className="row w-100">
            <Table letterType="out">
                {letters.map((letter, i) => {
                    const { letter_type, reference_number, id } = letter.letter

                    return (
                        <TableComponentTr
                            id={id}
                            letterNumber={reference_number}
                            no={++i}
                            letterType={letter_type}
                            destination={letter.destination}
                            key={i}
                            type="outgoing"
                            setLetters={setLetters}
                        />
                    )
                })}
            </Table>
        </div>
    )
}

export default OutgoingLetter
