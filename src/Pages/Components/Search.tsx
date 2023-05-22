const Search = ({ submited }: SearchT) => {
    return (
        <form className="d-flex gap-3 col-md-5" onSubmit={submited}>
            <input className="form-control border-success border-opacity-25" />
            <button className="btn btn-outline-success">Cari</button>
        </form>
    )
}

export default Search
