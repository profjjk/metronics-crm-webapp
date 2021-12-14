const CustomerSection = () => {
    return (
        <div className={"customer-section"}>
            <div>
                <label>
                    Contact Information
                    <input type={"text"} name={"businessName"} placeholder={"Business Name"} required />
                    <input type={"text"} name={"contactName"} placeholder={"Contact Name"} />
                    <input type={"text"} name={"phone"} placeholder={"Phone #"} required />
                </label>
            </div>
            <div>
                <label>
                    Address
                    <input type={"text"} name={"street1"} placeholder={"Street 1"} required />
                    <input type={"text"} name={"street2"} placeholder={"Street 2"} />
                    <div className={"cityStateZip"}>
                        <input type={"text"} name={"city"} placeholder={"City"} required />
                        <input className={"text-center"} type={"text"} name={"state"} defaultValue={"CA"} required />
                        <input type={"text"} name={"zipcode"} placeholder={"Zip Code"} required />
                    </div>
                </label>
            </div>
        </div>
    )
}

export default CustomerSection;