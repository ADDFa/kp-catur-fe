const useFormBuilder = () => {
    const create = (...children: { key: string; value: string }[]) => {
        const form = document.createElement("form")
        children.forEach(({ key, value }) => form.append(key, value))
        return form
    }

    return create
}

export default useFormBuilder
