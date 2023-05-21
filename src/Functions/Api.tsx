import { setAuth } from "./Auth"

const BASE_API = "http://127.0.0.1:8000/api"

const resParse = async (res: Response) => {
    const { ok, status, statusText } = res

    return {
        ok,
        status,
        statusText,
        result: await res.json()
    } as Response
}

const checkToken = () => {
    const tokenAccess = localStorage.getItem("token_access")
    const token_refresh = localStorage.getItem("token_refresh")
    if (!tokenAccess) return "Invalid Token"

    const tokenPayload = tokenAccess.split(".")[1]
    const payload = JSON.parse(atob(tokenPayload))
    const time = Math.floor(new Date().getTime() / 1000) + 10 // 10 detik lebih cepat

    return new Promise<boolean>((resolve, reject) => {
        if (payload.exp > time) return resolve(true)

        fetch(`${BASE_API}/refresh`, {
            method: "POST",
            body: JSON.stringify({ token_refresh }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => resParse(res))
            .then((res) => {
                console.log(res)
                if (res.ok) {
                    setAuth(res.result.data)
                } else {
                    return reject(res.statusText)
                }
            })
    })
}

const fetchingData = async (path: string, init: RequestInit) => {
    try {
        await checkToken()
    } catch (e) {
        console.error(e)
    }

    return new Promise<Response>((resolve, reject) => {
        fetch(`${BASE_API}/${path}`, init)
            .then(async (res) => await resParse(res))
            .then((res) => {
                if (res.ok) return resolve(res)
                return reject(res)
            })
    })
}

const headers = (headers?: Record<string, string>): RequestInit["headers"] => {
    return {
        Authorization: `Bearer ${localStorage.getItem("token_access")}`,
        ...headers
    }
}

export const get = (path: string) => {
    return fetchingData(path, {
        method: "GET",
        headers: headers()
    })
}

export const post = (path: string, form?: HTMLFormElement) => {
    return fetchingData(path, {
        method: "POST",
        headers: headers(),
        body: new FormData(form)
    })
}

export const destroy = (path: string) => {
    return fetchingData(path, {
        method: "DELETE",
        headers: headers()
    })
}

export const put = (path: string, form?: HTMLFormElement) => {
    return fetchingData(path, {
        method: "PUT",
        headers: headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
}
