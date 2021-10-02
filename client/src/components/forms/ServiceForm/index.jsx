import { DropdownSection, CustomerSection, JobNotesSection, PartsSection, SaveButton } from "../sections";

const ServiceForm = ({ customer, job, parts, setParts, submitHandler, removePartHandler, setShowForm }) => {
    return (
        <form className="p-5" onSubmit={submitHandler}>
            <h1 className="text-primary text-center mb-5">Service Job Form</h1>
            <DropdownSection job={job} />
            <CustomerSection customer={customer } />
            <JobNotesSection job={job} />
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
