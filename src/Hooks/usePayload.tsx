const usePayload = () => {
    const tokenAccess = localStorage.getItem("token_access")
    if (!tokenAccess) return "Invalid Token"

    const tokenPayload = tokenAccess.split(".")[1]
    const payload = JSON.parse(atob(tokenPayload))
    return payload
}

export default usePayload
