const toCapitalize = (string: string): string => {
    return string.at(0)?.toUpperCase().concat(string.slice(1)) as string
}

export default toCapitalize
