type LetterT = Record<string, any>

type LetterTypeT = "incoming" | "outgoing"

interface LettersT {
    letters: LetterT[]
    setLetters: React.Dispatch<React.SetStateAction<LetterT[]>>
}
