import Table from "./Table"
import TableComponentTr from "./TableComponentTr"

const IncomingLetter = ({ letters, setLetters }: LettersT) => {
    return (
        <>
            <div className="row w-100">
                <Table letterType="in">
                    {letters.map((letter, i) => {
                        const { letter_type, reference_number, date, id } =
                            letter.letter

                        return (
                            <TableComponentTr
                                id={id}
                                letterNumber={reference_number}
                                no={++i}
                                letterType={letter_type}
                                sender={letter.sender}
                                key={i}
                                date={date}
                                type="incoming"
                                setLetters={setLetters}
                            />
                        )
                    })}
                </Table>
            </div>
        </>
    )
}

export default IncomingLetter
