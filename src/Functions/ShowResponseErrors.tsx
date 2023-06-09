import Toast from "../Components/Toast"
import { el } from "./GetElement"

const showResponseErrors = (errors: Record<string, string[]>) => {
    for (const error in errors) {
        const elementError = el(`[name=${error}]`)
        if (!elementError) continue

        elementError.classList.add("is-invalid")

        let elementFeedback =
            elementError.parentElement?.querySelector(".invalid-feedback")
        if (elementFeedback) {
            return (elementFeedback.textContent = errors[error][0])
        }

        elementFeedback = document.createElement("p")
        elementFeedback.classList.add("invalid-feedback")
        elementFeedback.textContent = errors[error][0]

        elementError.parentElement?.append(elementFeedback)
        const events = ["change", "keypress"]

        events.map((event) => {
            elementError.addEventListener(event, (evt) => {
                const target = evt.currentTarget as HTMLElement
                if (target.classList.contains("is-invalid")) {
                    target.classList.remove("is-invalid")
                }
            })
        })
    }
}

const showErrorMessage = (message: string) => {
    Toast.fire({
        icon: "warning",
        text: message
    })
}

export const showError = (error: Response) => {
    console.log(error)
    if (!error.result) return console.log(error)
    if ("errors" in error.result) return showResponseErrors(error.result.errors)
    if ("message" in error.result) return showErrorMessage(error.result.message)
}
