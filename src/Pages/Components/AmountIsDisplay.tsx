const AmountIsDisplay = ({ selected }: AmountIsDisplayT) => {
    const amounts: number[] = [5, 10, 20, 30, 50, 70, 100]

    return (
        <form className="form-floating col-md-4">
            <select
                className="form-select"
                id="amountIsDisplay"
                aria-label="Tampilkan Data Sebanyak"
                onInput={selected}
            >
                {amounts.map((amount, i) => (
                    <option value={amount} key={i}>
                        {amount} Data
                    </option>
                ))}
            </select>
            <label htmlFor="amountIsDisplay">Tampilkan Sebanyak</label>
        </form>
    )
}

export default AmountIsDisplay
