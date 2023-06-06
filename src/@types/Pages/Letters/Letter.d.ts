type LetterT = Record<string, any>

type LetterTypeT = "incoming" | "outgoing"

interface LettersT {
    letters: LetterT[]
}

interface LetterContextT {
    setLetters: React.Dispatch<React.SetStateAction>
}
