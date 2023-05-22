import Table from "./Table"
import TableComponentTr from "./TableComponentTr"

const OutgoingLetter = ({ letters, setLetters }: LettersT) => {
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
