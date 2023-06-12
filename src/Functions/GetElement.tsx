export const el = <T extends HTMLElement>(element: string) =>
    document.querySelector(`${element}`) as T

export const elAll = (element: string) =>
    Array.from(document.querySelectorAll(`${element}`))

export const gi = <T extends HTMLElement>(element: string): T =>
    document.getElementById(`${element}`) as T
