export const el = (element: string) => document.querySelector(`${element}`)

export const elAll = (element: string) =>
    Array.from(document.querySelectorAll(`${element}`))
