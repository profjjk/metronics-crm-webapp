import { DropdownSection, CustomerSection, JobNotesSection, PartsSection, SaveButton } from "../sections";

const ServiceForm = ({ customer, job, parts, setParts, submitHandler, removePartHandler, setShowForm }) => {
    return (
        <form className="p-5" onSubmit={submitHandler}>
            <h1 className="text-primary text-center mb-5">Service Job Form</h1>
            <DropdownSection job={job} />
            <CustomerSection customer={customer} />
            <JobNotesSection job={job} />
            <h6 className={"mx-3"}>Total Bill</h6>
            <div className={"px-3 d-flex"}>
                <input
                    type="text"
                    className="form-control me-3 w-25"
                    name="totalBill"
                    placeholder={"total bill"}
                    defaultValue={job ? job.totalBill : ""}
                />
                <label className={"mx-3"}>
                    Paid?
                    <input
                        className={"mx-3"}
                        type={"checkbox"}
                        name={"isPaid"}
                        defaultChecked={job && job.isPaid === true ? "on" : undefined}
                    />
                </label>
            </div>
            <PartsSection
                parts={parts}
                removePartHandler={removePartHandler}
                setParts={setParts}
            />
            <SaveButton setShowForm={setShowForm}/>
        </form>
    );
}

export default ServiceForm;
