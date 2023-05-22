const DateFilter = ({ inputed }: DateFilterT) => {
    return (
        <form
            className="col-md-6 d-flex gap-3 align-items-center"
            onInput={inputed}
        >
            <input
                className="form-control border-success border-opacity-25"
                type="date"
                name="from"
            />
            <span className="fs-4">-</span>
            <input
                className="form-control border-success border-opacity-25"
                type="date"
                name="until"
            />
        </form>
    )
}

export default DateFilter
