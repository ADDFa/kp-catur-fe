import { memo } from "react"

const FilterDate: React.FC<FilterDateT> = ({ setAfter, setBefore }) => {
    const Input = (
        name: string,
        action: React.FormEventHandler<HTMLInputElement>
    ) => {
        return (
            <input
                className="form-control border-success border-opacity-25"
                type="date"
                name={name}
                id={name}
                onInput={action}
            />
        )
    }

    const handleBefore: React.FormEventHandler<HTMLInputElement> = (evt) => {
        setBefore(evt.currentTarget.value)
    }

    const handleAfter: React.FormEventHandler<HTMLInputElement> = (evt) => {
        setAfter(evt.currentTarget.value)
    }

    return (
        <div className="col-md-6 d-flex gap-3 align-items-center">
            {Input("after", handleAfter)}
            <span className="fs-4">-</span>
            {Input("before", handleBefore)}
        </div>
    )
}

export default memo(FilterDate)
