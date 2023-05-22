import Toast from "../Components/Toast"
import { el } from "./GetElement"

const showResponseErrors = (errors: Record<string, string[]>) => {
    for (const error in errors) {
        const elementError = el(`[name=${error}]`)
        if (!elementError) continue

        elementError.classList.add("is-invalid")
        const elementFeedback =
            elementError.parentElement?.querySelector(".invalid-feedback")
        if (!elementFeedback) continue

        elementFeedback.classList.remove("d-none")
        elementFeedback.textContent = errors[error][0]
    }
}

const showErrorMessage = (message: string) => {
    Toast.fire({
        icon: "error",
        text: message
    })
}

export const showError = (error: Response) => {
    if (!error.result) return console.error(error)
    if ("errors" in error.result) return showResponseErrors(error.result.errors)
    if ("message" in error.result) return showErrorMessage(error.result.message)
}
