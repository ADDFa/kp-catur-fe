const useFormBuilder = () => {
    const create = (...children: { key: string; value: string }[]) => {
        const form = document.createElement("form")
        children.forEach(({ key, value }) => {
            const input = document.createElement("input")
            input.name = key
            input.value = value

            form.append(input)
        })
        return form
    }

    return create
}

export default useFormBuilder
