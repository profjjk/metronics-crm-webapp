import { CustomerSection, SaveButton } from "../sections";

const CustomerForm = ({ customer, submitHandler, setShowForm }) => {
    return (
        <form className="p-5" onSubmit={submitHandler}>
            <h1 className="text-primary text-center mb-5">Customer Form</h1>
            <CustomerSection customer={customer} />
            <div className={"px-3"}>
                <textarea
                    className="form-control"
                    name="notes"
                    placeholder={"notes about customer"}
                    defaultValue={customer ? customer.notes : ""}>
                </textarea>
            </div>
            <SaveButton setShowForm={setShowForm} />
        </form>
    );
}

export default CustomerForm;