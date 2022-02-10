import { useMutation, useQueryClient } from 'react-query';
import { useData, useToast } from '../../../react-query';
import API from '../../../utils/API';

const CustomerForm = () => {
    const qc = useQueryClient();
    const { addToast } = useToast();
    const customer = useData('selectedCustomer');
    const submissionType = useData('submissionType');

    // DATA MUTATIONS
    const createCustomer = useMutation(customer => API.createCustomer(customer), {
        onSuccess: () => {
            qc.invalidateQueries("customers");
        }
    });

    const editCustomer = useMutation(customer => API.updateCustomer(customer.id, customer.data), {
        onSuccess: () => {
            qc.invalidateQueries("customers");
            qc.invalidateQueries("jobs");
        }
    });

    const deleteCustomer = useMutation(id => API.deleteCustomer(id), {
        onSuccess: () => {
            qc.invalidateQueries("customers");
        },
    });

    const deleteJobs = useMutation(id => API.deleteJobsByCustomerId(id), {
        onSuccess: () => {
            qc.invalidateQueries("jobs");
        }
    });

    // EVENT LISTENERS
    const removeCustomer = async () => {
        // TODO: create custom modal for confirmation so the page doesn't reload.
        let answer = window.confirm("Are you sure you want to delete?\n" +
            "This will delete the customer and their service history from the database.\n" +
            "This cannot be undone.");

        if (answer) {
            await deleteCustomer.mutate(customer._id);
            deleteJobs.mutate(customer._id);
            qc.setQueryData('selectedCustomer', null);
            qc.setQueryData('view', 'default');
        }

        addToast("Customer Deleted");
    }
    const submitForm = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            const customerData = {
                businessName: formData.businessName.trim(),
                contactName: formData.contactName.trim(),
                phone: formData.phone.trim(),
                address: {
                    street1: formData.street1.trim(),
                    street2: formData.street2.trim(),
                    city: formData.city.trim(),
                    state: formData.state.trim(),
                    zipcode: formData.zipcode.trim()
                },
                notes: formData.notes.trim()
            }

            if (submissionType === 'edit') {
                await editCustomer.mutate({ id: customer._id, data: customerData});
            }

            if (submissionType === 'new') {
                await createCustomer.mutateAsync(customerData);
            }

            qc.setQueryData('view', 'default');
        } catch(err) { console.error(err) }
    };

    return (
        <section>
            <form id={"form-customer"} onSubmit={submitForm}>
                <div className={"customer-area"}>
                    <div>
                        <label>
                            Contact Information
                            <input type={"text"} name={"businessName"} placeholder={"Business Name"} required
                                   defaultValue={customer ? customer.businessName : ""}/>
                            <input type={"text"} name={"contactName"} placeholder={"Contact Person"}
                                   defaultValue={customer ? customer.contactName : ""}/>
                            <input type={"text"} name={"phone"} placeholder={"Phone #"} required
                                   defaultValue={customer ? customer.phone : ""}/>
                        </label>
                    </div>

                    <div>
                        <label className={"address"}>
                            Address
                            <input type={"text"} name={"street1"} placeholder={"Street Address"} required
                                   defaultValue={customer ? customer.address.street1 : ""}/>
                            <input type={"text"} name={"street2"} placeholder={"Unit or Building #"}
                                   defaultValue={customer ? customer.address.street2 : ""}/>

                            <div>
                                <input type={"text"} name={"city"} placeholder={"City"} required
                                       defaultValue={customer ? customer.address.city : ""}/>
                                <input className={"text-center"} type={"text"} name={"state"} defaultValue={"CA"} required/>
                                <input type={"text"} name={"zipcode"} placeholder={"Zip Code"} required
                                       defaultValue={customer ? customer.address.zipcode : ""}/>
                            </div>
                        </label>
                    </div>
                </div>

                <div className={"notes-area"}>
                    <label>
                        Notes
                        <textarea name={"notes"} defaultValue={customer ? customer.notes : ""} />
                    </label>
                </div>

                <div className={"button-area"}>
                    <button className={"btn-form"} type={"submit"}>
                        Save
                    </button>

                    <button className={"btn-form"} onClick={() => {
                        qc.setQueryData('selectedCustomer', null);
                        qc.setQueryData('view', 'default');
                    }}>
                        Cancel
                    </button>

                    {customer && customer._id ? (<button className={"btn-form delete"} onClick={removeCustomer}>
                        Delete
                    </button>) : <></>}
                </div>
            </form>
        </section>
    )
}

export default CustomerForm;
