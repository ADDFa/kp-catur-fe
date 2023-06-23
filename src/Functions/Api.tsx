import Auth from "./Auth"
import { showError } from "./ShowResponseErrors"

// export const BASE_API = "http://127.0.0.1:8000/api"
export const BASE_API = "https://sipemulu.000webhostapp.com/api"

const fetchingData = async (path: string, init: RequestInit) => {
    return new Promise<Response>((resolve, reject) => {
        fetch(`${BASE_API}/${path}`, init)
            .then(async (res) => {
                const { ok, status, statusText } = res
                return {
                    ok,
                    status,
                    statusText,
                    result: await res.json()
                } as Response
            })
            .then((res) => (res.ok ? resolve(res) : reject(res)))
    })
}

export const handleRequest = async (path: string, init: RequestInit) => {
    const headers: HeadersInit | undefined = init.headers
    const allowPath = ["login", "refresh"]

    try {
        const isValid: boolean = allowPath.find((allow) => allow === path)
            ? true
            : await checkToken()

        if (isValid) {
            const data = await fetchingData(path, {
                ...init,
                headers: {
                    Authorization: `Bearer ${Auth.token_access}`,
                    ...headers
                }
            })

            return data
        }
    } catch (e) {
        showError(e as Response)
        return e as Response
    }
}

const checkToken = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const payload = Auth.payload
        if (!payload) return reject(false)

        const now = Math.floor(new Date().getTime() / 1000) + 10 // 10 detik lebih cepat
        if (payload.exp > now) return resolve(true)

        fetch(`${BASE_API}/refresh`, {
            method: "POST",
            body: JSON.stringify({ token_refresh: Auth.token_refresh }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (res) => {
                if (res.ok) return await res.json()

                localStorage.clear()
                window.location.href = "/"
                return reject(false)
            })
            .then((res) => {
                Auth.token_access = res.data.token_access
                Auth.token_refresh = res.data.token_refresh
                return resolve(true)
            })
    })
}

export const createForm = (
    method: "POST" | "PUT" | "DELETE",
    formChild: { key: string; value: string }[]
): FormData => {
    const body = new FormData(document.createElement("form"))
    body.append("_method", method)

    formChild.map(({ key, value }) => {
        return body.append(key, value)
    })

    return body
}

export const get = async (path: string) => {
    return await handleRequest(path, { method: "GET" })
}

export const post = async (path: string, form?: HTMLFormElement) => {
    return await handleRequest(path, {
        method: "POST",
        body: new FormData(form)
    })
}

export const put = async (path: string, form?: HTMLFormElement) => {
    const body = new FormData(form)
    body.append("_method", "PUT")

    return await handleRequest(path, {
        method: "POST",
        body
    })
}

export const destroy = async (
    path: string,
    ...formChild: { key: string; value: string }[]
) => {
    return await handleRequest(path, {
        method: "POST",
        body: createForm("DELETE", formChild)
    })
}

export const patch = async (path: string) => {
    return await handleRequest(path, {
        method: "PATCH"
    })
}
