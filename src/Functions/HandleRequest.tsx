import { destroy, get, post, put } from "./Api"
import { showError } from "./ShowResponseErrors"

const handleRequest = async (
    request: "get" | "post" | "delete" | "put",
    path: string,
    form?: HTMLFormElement
) => {
    try {
        switch (request) {
            case "get":
                return await get(path)

            case "post":
                return await post(path, form)

            case "put":
                return await put(path, form)

            case "delete":
                return await destroy(path)
        }
    } catch (e: any) {
        showError(e)
        return null
    }
}

export default handleRequest
