import { CustomerSection, SaveButton } from "../sections";

const CustomerForm = ({ customer, submitHandler, setShowForm }) => {
    return (
        <form className="p-5" onSubmit={submitHandler}>
            <h1 className="text-primary text-center mb-5">Customer Form</h1>
            <CustomerSection customer={customer} />
            <SaveButton setShowForm={setShowForm} />
        </form>
    );
}

export default CustomerForm;