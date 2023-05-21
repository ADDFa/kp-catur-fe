export const setAuth = ({ token_access, token_refresh, user }: AuthT) => {
    localStorage.setItem("token_access", token_access)
    localStorage.setItem("token_refresh", token_refresh)
    localStorage.setItem("user", JSON.stringify(user))
}
