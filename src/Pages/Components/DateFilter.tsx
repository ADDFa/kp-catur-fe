const DateFilter = () => {
    return (
        <form className="col-md-6 d-flex gap-3 align-items-center">
            <input
                className="form-control border-success border-opacity-25"
                type="date"
            />
            <span className="fs-4">-</span>
            <input
                className="form-control border-success border-opacity-25"
                type="date"
            />
        </form>
    )
}

export default DateFilter
