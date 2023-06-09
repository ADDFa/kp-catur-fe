class Auth {
    static getStore(name: string): string {
        return localStorage.getItem(name) || ""
    }

    static get token_access() {
        return this.getStore("token_access")
    }

    static set token_access(val) {
        localStorage.setItem("token_access", val)
    }

    static get token_refresh() {
        return this.getStore("token_refresh")
    }

    static set token_refresh(val) {
        localStorage.setItem("token_refresh", val)
    }

    static get user(): Record<string, any> {
        const user = this.getStore("user")
        return user ? JSON.parse(user) : ""
    }

    static set user(val) {
        localStorage.setItem("user", JSON.stringify(val))
    }

    static get payload(): Record<string, any> | null {
        const data = this.getStore("token_access")
        return data ? JSON.parse(atob(data.split(".")[1])) : null
    }

    static get isNull(): boolean {
        const issetNull = this.token_access || this.token_refresh
        return !issetNull
    }
}

export default Auth
