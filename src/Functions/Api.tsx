import { setAuth } from "./Auth"
import { showError } from "./ShowResponseErrors"

const BASE_API = "http://127.0.0.1:8000/api"

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

export const handleRequest = async (
    path: string,
    init: RequestInit
): Promise<Response> => {
    try {
        await checkToken()
        return fetchingData(path, init)
    } catch (e) {
        showError(e as Response)
        return e as Response
    }
}

const checkToken = async () => {
    const token_refresh = localStorage.getItem("token_refresh")
    const token_access = localStorage.getItem("token_access")
    if (!token_access || !token_refresh) return

    const payload = JSON.parse(atob(token_access.split(".")[1]))
    const time = Math.floor(new Date().getTime() / 1000) + 10 // 10 detik lebih cepat

    if (payload.exp > time) return

    const res = await fetch(`${BASE_API}/refresh`, {
        method: "POST",
        body: JSON.stringify({ token_refresh }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (res.ok) {
        const respose = await res.json()
        return setAuth(respose.data)
    }

    console.log("generate token success")
    localStorage.clear()
}

export const get = async (path: string) => {
    return await handleRequest(path, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token_access")}`
        }
    })
}

export const post = async (path: string, form?: HTMLFormElement) => {
    return await handleRequest(path, {
        method: "POST",
        body: new FormData(form)
    })
}

export const put = async (path: string, form?: HTMLFormElement) => {
    return await handleRequest(path, {
        method: "PUT",
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token_access")}`,
            "Content-Type": "application/json"
        }
    })
}

export const destroy = async (path: string) => {
    return await handleRequest(path, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token_access")}`
        }
    })
}
