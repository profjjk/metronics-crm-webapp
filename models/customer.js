const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    business_name: { type: String, required: [true, 'business name required'] },
    contact_name: String,
    phone: { type: String, required: [true, 'phone # required'] },
    street_1: String,
    street_2: String,
    city: String,
    state: String,
    zipcode: String,
    jobs: []
})

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;