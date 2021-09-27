const mongoose = require('mongoose');
const { jobSchema } = require('./job');

const customerSchema = new mongoose.Schema({
    businessName: { type: String, required: [true, 'Business name required'] },
    contactName: String,
    phone: { type: String, required: [true, 'Phone # required'] },
    address: {
        street1: String,
        street2: String,
        city: String,
        state: { type: String, default: 'CA' },
        zipcode: String
    },
    jobs: [jobSchema]
})

const CustomerModel = mongoose.model("Customer", customerSchema);

module.exports = CustomerModel;