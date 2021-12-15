import './style.scss';

const CustomerForm = ({ customer, setCustomer, submit, setShowForm }) => {
    return (
        <section>
            <form id={"form-customer"}>
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
                        Customer Notes
                        <textarea name={"notes"} defaultValue={customer ? customer.notes : ""} />
                    </label>
                </div>

                <div className={"button-area"}>
                    <button className={"btn-form"} type={"submit"}>
                        Save
                    </button>

                    <button className={"btn-form"} onClick={() => {
                        setCustomer(null)
                        setShowForm(false)
                    }}>
                        Cancel
                    </button>

                    {/*{job && job._id ? (<button className={"btn-form delete"} onClick={() => {*/}
                    {/*    if (viewRequests) {*/}
                    {/*        removeRequest(job._id)*/}
                    {/*    } else {*/}
                    {/*        removeJob(job._id);*/}
                    {/*    }*/}
                    {/*    setJob(null)*/}
                    {/*    setCustomer(null)*/}
                    {/*    setShowForm(false)*/}
                    {/*}}>*/}
                    {/*    Delete*/}
                    {/*</button>) : <></>}*/}
                </div>
            </form>
        </section>
    )
}

export default CustomerForm;