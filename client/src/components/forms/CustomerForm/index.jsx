
const CustomerForm = ({ customer, submitHandler, setShowForm }) => {
    console.log(customer)

    return (
        <form className="p-5" onSubmit={submitHandler}>
            <h1 className="text-primary text-center mb-5">Customer Form</h1>

            <div id="customer-area" className="my-3">
                <div className="px-3">
                    <h6>Contact Information</h6>
                    <input
                        type="text"
                        className="form-control"
                        name="businessName"
                        placeholder={"business name"}
                        defaultValue={customer ? customer.businessName : ""}
                    />
                    <input
                        type="text"
                        className="form-control my-2"
                        name="contactName"
                        placeholder={"contact name"}
                        defaultValue={customer ? customer.contactName : ""}
                    />
                    <input
                        type="tel"
                        pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
                        required
                        className="form-control"
                        name="phone"
                        placeholder={"123-456-7890"}
                        defaultValue={customer ? customer.phone : ""}
                    />
                </div>

                <div className="px-3">
                    <h6>Address</h6>
                    <input
                        type="text"
                        className="form-control"
                        name="street1"
                        placeholder={"street 1"}
                        defaultValue={customer ? customer.address.street1 : ""}
                    />
                    <input
                        type="text"
                        className="form-control my-2"
                        name="street2"
                        placeholder={"street 2"}
                        defaultValue={customer ? customer.address.street2 : ""}
                    />
                    <div id="address">
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            placeholder={"city"}
                            defaultValue={customer ? customer.address.city : ""}
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="state"
                            placeholder={"state"}
                            defaultValue={customer ? customer.address.state : "CA"}
                        />
                        <input
                            type="text"
                            className="form-control"
                            name="zipcode"
                            placeholder={"zip code"}
                            defaultValue={customer ? customer.address.zipcode : ""}
                        />
                    </div>
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
    );
}

export default CustomerForm;