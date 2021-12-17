import './style.scss';

const PartForm = ({ submitHandler, setShowForm, part }) => {
    return (
        <form className="p-5" onSubmit={submitHandler}>
            <h1 className="text-primary text-center mb-5">{part ? "Edit Part Form" : "New Part Form"}</h1>

            <div className="my-3">
                <h4 className={"px-3"}>Part Information</h4>
                <div className="p-3" id={"partForm-top"}>
                    <input
                        type="text"
                        className="form-control text-center"
                        name="partNumber"
                        placeholder={"Part #"}
                        defaultValue={part ? part.partNumber : ""}
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        placeholder={"Description"}
                        defaultValue={part ? part.description : ""}
                    />
                    <input
                        type="text"
                        className="form-control text-center"
                        name="stock"
                        placeholder={"# in stock"}
                        defaultValue={part ? part.stock : ""}
                    />
                </div>
                <div className="p-3" id={"partForm-middle"}>
                    <input
                        type="text"
                        className="form-control text-center"
                        name="purchasePrice"
                        placeholder={"Purchase $"}
                        defaultValue={part ? part.purchasePrice : ""}
                    />
                    <input
                        type="text"
                        className="form-control text-center"
                        name="salePrice"
                        placeholder={"Sale $"}
                        defaultValue={part ? part.salePrice : ""}
                    />
                    <label className={"text-end"}>Notify me when stock drops below:</label>
                    <input
                        type="text"
                        className="form-control text-center"
                        name="minimum"
                        placeholder={"#"}
                        defaultValue={part ? part.minimum : ""}
                    />
                </div>
            </div>

            <div className="mt-4 px-3">
                <button className="btn btn-primary me-3 form-btn" type="submit">
                    Save
                </button>
                <button
                    className="btn btn-secondary form-btn"
                    onClick={() => setShowForm(false)}
                    >Cancel
                </button>
            </div>
        </form>
    )
}

export default PartForm;